
import { Head, useForm } from '@inertiajs/react';
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ThumbnailInput from '@/Components/ThumbnailInput';
import InputLabel from '@/Components/InputLabel';
import { Input } from '@/Components/input';
import { Button } from '@/Components/button';
import { useEffect, useMemo, useRef, useState } from 'react';


export default function Create({ templates }) {
    const [timelineItems, setTimelineItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const PIXELS_PER_SECOND = 20;
    const TIMELINE_WIDTH = 1200;

    const selectedItem = useMemo(
        () => timelineItems.find(i => i.id === selectedItemId) || null,
        [timelineItems, selectedItemId]
    );

    function handleDragStart(e, paletteItem) {
        e.dataTransfer.setData('application/x-palette-item', JSON.stringify(paletteItem));
        e.dataTransfer.effectAllowed = 'copy';
    }


    function handleTimelineDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('application/x-palette-item');
        console.log('handleTimelineDrop',handleTimelineDrop);
        
        
        if (!data) return;
        const paletteItem = JSON.parse(data);
        const bounding = e.currentTarget.getBoundingClientRect();
        const dropX = e.clientX - bounding.left;
        const startSeconds = Math.max(0, Math.round(dropX / PIXELS_PER_SECOND));

        const newItem = {
            id: `itm_${Date.now()}`,
            type: paletteItem.type,
            label: paletteItem.label,
            text: paletteItem.type === 'text' ? 'New Text' : '',
            color: paletteItem.type === 'shape' ? '#22c55e' : '#0ea5e9',
            start: startSeconds,
            duration: 5,
        };
        setTimelineItems(prev => [...prev, newItem]);
        setSelectedItemId(newItem.id);
        setIsDrawerOpen(true);
    }

    function handleTimelineDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    function handleItemClick(itemId) {
        setSelectedItemId(itemId);
        setIsDrawerOpen(true);
    }

    function updateSelectedItem(partial) {
        setTimelineItems(items => items.map(i => (i.id === selectedItemId ? { ...i, ...partial } : i)));
    }

    function removeSelectedItem() {
        setTimelineItems(items => items.filter(i => i.id !== selectedItemId));
        setSelectedItemId(null);
        setIsDrawerOpen(false);
    }

    const palette = [
        { type: 'text', label: 'Text' },
        { type: 'image', label: 'Image' },
        { type: 'shape', label: 'Shape' },
    ];

    // Single-track interactions: click-to-create, drag move, resize left/right
    const trackRef = useRef(null);
    const [dragState, setDragState] = useState(null);

    function getSecondsFromClientX(clientX) {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return 0;
        const x = clientX - rect.left;
        return Math.max(0, Math.round(x / PIXELS_PER_SECOND));
    }


    function beginMove(item, clientX) {
        setDragState({
            mode: 'move',
            itemId: item.id,
            startClientX: clientX,
            originalStart: item.start,
        });
    }

    function beginResize(item, edge, clientX) {
        setDragState({
            mode: edge === 'left' ? 'resize-left' : 'resize-right',
            itemId: item.id,
            startClientX: clientX,
            originalStart: item.start,
            originalDuration: item.duration,
        });
    }

    useEffect(() => {
        function onMouseMove(e) {
            if (!dragState) return;
            setTimelineItems(items => items.map(item => {
                if (item.id !== dragState.itemId) return item;
                const deltaSeconds = Math.round((e.clientX - dragState.startClientX) / PIXELS_PER_SECOND);
                if (dragState.mode === 'move') {
                    const newStart = Math.max(0, dragState.originalStart + deltaSeconds);
                    return { ...item, start: newStart };
                }
                if (dragState.mode === 'resize-left') {
                    const newStart = Math.max(0, dragState.originalStart + deltaSeconds);
                    const shift = newStart - dragState.originalStart;
                    const newDuration = Math.max(1, dragState.originalDuration - shift);
                    if (newDuration <= 1 && newStart > item.start) {
                        return { ...item, start: item.start, duration: 1 };
                    }
                    return { ...item, start: newStart, duration: newDuration };
                }
                if (dragState.mode === 'resize-right') {
                    const newDuration = Math.max(1, dragState.originalDuration + deltaSeconds);
                    return { ...item, duration: newDuration };
                }
                return item;
            }));
        }
        function onMouseUp() {
            if (dragState) setDragState(null);
        }
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragState, PIXELS_PER_SECOND]);

    return (
        <AuthenticatedLayout>
            <Head title="Create Video" />
            <div className="">
                <BreadcumComponent title="Create Video" />
                <div className="mt-4 grid grid-cols-12 gap-4">
                    <div className="col-span-3 xl:col-span-2">
                        <div className="rounded-lg border border-slate-200 bg-white">
                            <div className="px-4 py-3 border-b border-slate-200 font-semibold">Elements</div>
                            <div className="p-3 space-y-2">
                                {palette.map(p => {
                                    return (
                                        <div
                                            key={p.type}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, p)}
                                            className="cursor-grab active:cursor-grabbing rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 flex items-center gap-2"
                                        >
                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-200 text-slate-600 text-xs uppercase">{p.label[0]}</span>
                                            <span className="text-sm">{p.label}</span>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>

                    {/* This is the timeline*/}
                    <div className="col-span-9 xl:col-span-10">
                        <div className="rounded-lg border border-slate-200 bg-white">
                            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                                <div className="font-semibold">Timeline</div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="secondary" onClick={() => setTimelineItems([])}>Clear</Button>
                                    {selectedItem && (
                                        <Button size="sm" variant="destructive" onClick={removeSelectedItem}>Remove Selected</Button>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <div
                                    className="relative w-full"
                                    onDrop={handleTimelineDrop}
                                    onDragOver={handleTimelineDragOver}
                                >
                                    <div
                                        ref={trackRef}
                                        className="relative bg-slate-50"
                                        style={{ width: TIMELINE_WIDTH, height: 120 }}
                                    >
                                        {Array.from({ length: Math.floor(TIMELINE_WIDTH / PIXELS_PER_SECOND) + 1 }).map((_, i) => (
                                            <div key={i} className="absolute top-0 bottom-0 w-px bg-slate-200/60" style={{ left: i * PIXELS_PER_SECOND }} />
                                        ))}

                                        {timelineItems.map(item => {
                                            const left = item.start * PIXELS_PER_SECOND;
                                            const width = Math.max(10, item.duration * PIXELS_PER_SECOND);
                                            const isSelected = item.id === selectedItemId;
                                            console.log('item', item);
                                            
                                            return (
                                                <div
                                                    key={item.id}
                                                    data-role="timeline-item"
                                                    onClick={() => handleItemClick(item.id)}
                                                    className={`absolute top-6 h-10 rounded-md border ${isSelected ? 'border-sky-500 ring-2 ring-sky-200' : 'border-slate-300'} text-xs text-white flex items-center px-2 cursor-move`}
                                                    style={{ left, width, backgroundColor: item.color }}
                                                    title={`${item.label} (${item.start}s - ${item.start + item.duration}s)`}
                                                    onMouseDown={(e) => beginMove(item, e.clientX)}
                                                >
                                                    <div
                                                        className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-black/10 hover:bg-black/20"
                                                        onMouseDown={(e) => { e.stopPropagation(); beginResize(item, 'left', e.clientX); }}
                                                    />
                                                    <span className="truncate">
                                                        {item.type === 'text' && item.text ? item.text : item.label}
                                                    </span>
                                                    <div
                                                        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-black/10 hover:bg-black/20"
                                                        onMouseDown={(e) => { e.stopPropagation(); beginResize(item, 'right', e.clientX); }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* This is the drawer*/}
                <div className={`fixed top-0 z-50 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-xl transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                        <div className="font-semibold">Properties</div>
                        <Button size="sm" variant="ghost" onClick={() => setIsDrawerOpen(false)}>Close</Button>
                    </div>
                    <div className="p-4 space-y-4">
                        {selectedItem ? (
                            <>
                                <div>
                                    <InputLabel value="Type" />
                                    <div className="text-sm text-slate-600 mt-1 capitalize">{selectedItem.type}</div>
                                </div>

                                {selectedItem.type === 'text' && (
                                    <div>
                                        <InputLabel htmlFor="text" value="Text" />
                                        <Input id="text" value={selectedItem.text}
                                            onChange={(e) => updateSelectedItem({ text: e.target.value })} />
                                    </div>
                                )}

                                <div>
                                    <InputLabel htmlFor="color" value="Color" />
                                    <Input id="color" type="color" value={selectedItem.color}
                                        onChange={(e) => updateSelectedItem({ color: e.target.value })} />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <InputLabel htmlFor="start" value="Start (s)" />
                                        <Input id="start" type="number" min="0" value={selectedItem.start}
                                            onChange={(e) => updateSelectedItem({ start: Math.max(0, Number(e.target.value || 0)) })} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="duration" value="Duration (s)" />
                                        <Input id="duration" type="number" min="1" value={selectedItem.duration}
                                            onChange={(e) => updateSelectedItem({ duration: Math.max(1, Number(e.target.value || 1)) })} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>Done</Button>
                                    <Button variant="destructive" onClick={removeSelectedItem}>Delete</Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-slate-500">Select an item to edit its properties.</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
