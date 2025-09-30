import { io } from "socket.io-client";

const socket = io("http://localhost:3000/template", {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
