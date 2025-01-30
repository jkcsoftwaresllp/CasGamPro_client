import { io } from "socket.io-client";

let socket = null;
const URL = "http://localhost:4320/";
export const connectSocket = (event) => {
  const url = URL + event;
  if (!socket || !socket.connected) {
    socket = io(url);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToEvent = (eventName, callback) => {
  if (!socket) throw new Error("Socket is not connected!");
  socket.on(eventName, callback);
};

export const emitEvent = (eventName, payload) => {
  if (!socket) throw new Error("Socket is not connected!");
  socket.emit(eventName, payload);
};
