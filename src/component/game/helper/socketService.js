import { io } from "socket.io-client";

const isDevelopment = import.meta.env.DEV;
const productionIP = '88.222.214.174';

export const URL = isDevelopment
  ? 'http://localhost:4320'
  : `http://${productionIP}:4320`;

const sockets = {}; // Store multiple socket instances

export const connectSocket = (namespace) => {
  const url = URL + namespace;

  if (!sockets[namespace] || !sockets[namespace].connected) {
    sockets[namespace] = io(url, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      withCredentials: true,
      path: '/socket.io/'
    });

    // Add error handling
    sockets[namespace].on('connect_error', (error) => {
      console.error(`Connection error for namespace ${namespace}:`, error);
    });

    sockets[namespace].on('error', (error) => {
      console.error(`Socket error for namespace ${namespace}:`, error);
    });
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
