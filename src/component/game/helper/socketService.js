import { io } from "socket.io-client";

const URL = "http://localhost:4320/";
const sockets = {}; // Store multiple socket instances

export const connectSocket = (namespace) => {
  const url = URL + namespace;

  // If the socket for this namespace does not exist or is disconnected, create a new one
  if (!sockets[namespace] || !sockets[namespace].connected) {
    sockets[namespace] = io(url);
  }

  return sockets[namespace];
};

export const disconnectSocket = (namespace) => {
  if (sockets[namespace]) {
    sockets[namespace].disconnect();
    delete sockets[namespace]; // Remove the reference
  }
};

export const subscribeToEvent = (namespace, eventName, callback) => {
  if (!sockets[namespace])
    throw new Error(`Socket for ${namespace} is not connected!`);
  sockets[namespace].on(eventName, callback);
};

export const emitEvent = (namespace, eventName, payload) => {
  if (!sockets[namespace])
    throw new Error(`Socket for ${namespace} is not connected!`);
  sockets[namespace].emit(eventName, payload);
};
