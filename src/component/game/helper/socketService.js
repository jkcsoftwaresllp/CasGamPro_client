import { io } from "socket.io-client";

const isDevelopment = import.meta.env.DEV;
const productionIP = '88.222.214.174';

const URL = isDevelopment
  ? 'http://localhost:4320/'
  : `http://${productionIP}:4320/`;

const sockets = {};

export const connectSocket = (namespace) => {
  const url = URL + namespace;

  console.log("thsi", url);

  // If the socket for this namespace does not exist or is disconnected, create a new one
  if (!sockets[namespace] || !sockets[namespace].connected) {
    sockets[namespace] = io(url);
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
