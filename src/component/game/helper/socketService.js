import { io } from "socket.io-client";

const isDevelopment = import.meta.env.DEV;
const productionIP = '88.222.214.174';

const URL = isDevelopment
  ? 'http://localhost:4320'
  : `http://${productionIP}:4320`;

const socketOptions = {
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
  withCredentials: true
};

const sockets = {};

export const connectSocket = (namespace) => {
  const url = URL + namespace;

  if (!sockets[namespace] || !sockets[namespace].connected) {
    sockets[namespace] = io(url, socketOptions);

    // Add error handling
    sockets[namespace].on('connect_error', (error) => {
      console.error(`Connection error for namespace ${namespace}:`, error);
    });

    sockets[namespace].on('connect', () => {
      console.log(`Connected to namespace ${namespace}`);
    });

    sockets[namespace].on('disconnect', (reason) => {
      console.log(`Disconnected from namespace ${namespace}:`, reason);
    });
  }

  return sockets[namespace];
};

export const disconnectSocket = (namespace) => {
  if (sockets[namespace]) {
    sockets[namespace].disconnect();
    delete sockets[namespace];
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
