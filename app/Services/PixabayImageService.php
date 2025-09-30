<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PixabayImageService
{
    private string $apiKey;
    private string $baseUrl = 'https://pixabay.com/api/';
    private int $rateLimitRemaining = 100;
    private int $rateLimitReset = 60;

    public function __construct()
    {
        $this->apiKey = config('services.pixabay.key', '');
    }

    /**
     * Search for images with various filters
     */
    public function searchImages(array $params = []): array
    {
        $defaultParams = [
            'key' => $this->apiKey,
            'image_type' => 'all',
            'orientation' => 'all',
            'category' => null,
            'min_width' => 0,
            'min_height' => 0,
            'colors' => null,
            'editors_choice' => false,
            'safesearch' => false,
            'order' => 'popular',
            'page' => 1,
            'per_page' => 20,
            'lang' => 'en'
        ];

        $searchParams = array_merge($defaultParams, $params);
        
        // Remove null values
        $searchParams = array_filter($searchParams, function($value) {
            return $value !== null && $value !== '';
        });

        try {
            $response = Http::timeout(30)->get($this->baseUrl, $searchParams);
            
            if ($response->successful()) {
                $this->updateRateLimit($response);
                return $response->json();
            }
            
            $this->handleError($response);
            return ['error' => 'Failed to fetch images'];
            
        } catch (\Exception $e) {
            Log::error('Pixabay API Error: ' . $e->getMessage());
            return ['error' => 'Service temporarily unavailable'];
        }
    }

    /**
     * Search for images by query term
     */
    public function searchByQuery(string $query, array $filters = []): array
    {
        $params = array_merge(['q' => urlencode($query)], $filters);
        return $this->searchImages($params);
    }

    /**
     * Get images by category
     */
    public function getImagesByCategory(string $category, int $perPage = 20): array
    {
        return $this->searchImages([
            'category' => $category,
            'per_page' => $perPage
        ]);
    }

    /**
     * Get high-quality images with specific filters
     */
    public function getHighQualityImages(string $query = '', array $filters = []): array
    {
        $params = array_merge([
            'q' => $query,
            'min_width' => 1280,
            'min_height' => 720,
            'editors_choice' => true,
            'order' => 'popular'
        ], $filters);

        return $this->searchImages($params);
    }

    /**
     * Download image to local storage
     */
    public function downloadImage(array $image, string $disk = 'public'): ?string
    {
        try {
            // Use largeImageURL for best quality, fallback to webformatURL
            $imageUrl = $image['largeImageURL'] ?? $image['webformatURL'] ?? null;
            
            if (!$imageUrl) {
                throw new \Exception('No suitable image URL found');
            }

            // Generate filename
            $extension = $this->getImageExtension($imageUrl);
            $filename = 'pixabay_' . $image['id'] . '_' . time() . '.' . $extension;
            $path = 'pixabay/' . $filename;

            // Download image
            $response = Http::timeout(60)->get($imageUrl);
            
            if ($response->successful()) {
                // Store the image
                Storage::disk($disk)->put($path, $response->body());
                
                // Store image metadata
                $this->storeImageMetadata($image, $path, $disk);
                
                return Storage::disk($disk)->url($path);
            }
            
            throw new \Exception('Failed to download image');
            
        } catch (\Exception $e) {
            Log::error('Image download failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Download multiple images
     */
    public function downloadMultipleImages(array $images, string $disk = 'public'): array
    {
        $results = [];
        
        foreach ($images as $image) {
            $results[] = [
                'image' => $image,
                'download_url' => $this->downloadImage($image, $disk)
            ];
        }
        
        return $results;
    }

    /**
     * Get available categories
     */
    public static function getAvailableCategories(): array
    {
        return [
            'backgrounds', 'fashion', 'nature', 'science', 'education', 
            'feelings', 'health', 'people', 'religion', 'places', 
            'animals', 'industry', 'computer', 'food', 'sports', 
            'transportation', 'travel', 'buildings', 'business', 'music'
        ];
    }

    /**
     * Get available image types
     */
    public static function getAvailableImageTypes(): array
    {
        return ['all', 'photo', 'illustration', 'vector'];
    }

    /**
     * Get available orientations
     */
    public static function getAvailableOrientations(): array
    {
        return ['all', 'horizontal', 'vertical'];
    }

    /**
     * Get available colors
     */
    public static function getAvailableColors(): array
    {
        return [
            'grayscale', 'transparent', 'red', 'orange', 'yellow', 
            'green', 'turquoise', 'blue', 'lilac', 'pink', 
            'white', 'gray', 'black', 'brown'
        ];
    }

    /**
     * Get rate limit information
     */
    public function getRateLimitInfo(): array
    {
        return [
            'remaining' => $this->rateLimitRemaining,
            'reset_in_seconds' => $this->rateLimitReset
        ];
    }

    /**
     * Check if API key is configured
     */
    public function isConfigured(): bool
    {
        return !empty($this->apiKey);
    }

    /**
     * Update rate limit from response headers
     */
    private function updateRateLimit(Response $response): void
    {
        $this->rateLimitRemaining = (int) $response->header('X-RateLimit-Remaining', 100);
        $this->rateLimitReset = (int) $response->header('X-RateLimit-Reset', 60);
    }

    /**
     * Handle API errors
     */
    private function handleError(Response $response): void
    {
        $statusCode = $response->status();
        $message = $response->body();
        
        switch ($statusCode) {
            case 400:
                Log::error('Pixabay API: Bad Request - ' . $message);
                break;
            case 401:
                Log::error('Pixabay API: Unauthorized - Invalid API key');
                break;
            case 429:
                Log::warning('Pixabay API: Rate limit exceeded');
                break;
            case 500:
                Log::error('Pixabay API: Internal Server Error');
                break;
            default:
                Log::error('Pixabay API: Unknown error - ' . $message);
        }
    }

    /**
     * Get image extension from URL
     */
    private function getImageExtension(string $url): string
    {
        $path = parse_url($url, PHP_URL_PATH);
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        
        return $extension ?: 'jpg';
    }

    /**
     * Store image metadata
     */
    private function storeImageMetadata(array $image, string $path, string $disk): void
    {
        $metadata = [
            'pixabay_id' => $image['id'],
            'tags' => $image['tags'] ?? '',
            'user' => $image['user'] ?? '',
            'user_id' => $image['user_id'] ?? null,
            'views' => $image['views'] ?? 0,
            'downloads' => $image['downloads'] ?? 0,
            'likes' => $image['likes'] ?? 0,
            'comments' => $image['comments'] ?? 0,
            'page_url' => $image['pageURL'] ?? '',
            'downloaded_at' => now(),
            'local_path' => $path,
            'disk' => $disk
        ];

        // Store metadata as JSON file
        $metadataPath = str_replace('.', '_metadata.json', $path);
        Storage::disk($disk)->put($metadataPath, json_encode($metadata, JSON_PRETTY_PRINT));
    }
}