import { io } from "socket.io-client";

const isDevelopment = import.meta.env.DEV;
const productionIP = "88.222.214.174";

const URL = isDevelopment
  ? "http://localhost:5320/"
  : `http://${productionIP}:5320/`;

const sockets = {}; // Store multiple socket instances

// Connect to a socket for the given namespace
export const connectSocket = (namespace) => {
  const url = URL + namespace;

  // If the socket for this namespace does not exist or is disconnected, create a new one
  if (!sockets[namespace] || !sockets[namespace].connected) {
    sockets[namespace] = io(url);
  }

  return sockets[namespace];
};

// Disconnect the socket and clean up the reference
export const disconnectSocket = (namespace) => {
  console.log("Disconnected from namespace:", namespace);

  if (sockets[namespace]) {
    // Remove event listeners before disconnecting if necessary
    sockets[namespace].disconnect();
    delete sockets[namespace]; // Remove the reference to the socket
  }
};

// Subscribe to an event for a specific namespace
export const subscribeToEvent = (namespace, eventName, callback) => {
  if (!sockets[namespace])
    throw new Error(`Socket for ${namespace} is not connected!`);
  sockets[namespace].on(eventName, callback);
};

// Emit an event to a specific namespace
export const emitEvent = (namespace, eventName, payload) => {
  if (!sockets[namespace])
    throw new Error(`Socket for ${namespace} is not connected!`);
  sockets[namespace].emit(eventName, payload);
};
