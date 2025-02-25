const isDevelopment = import.meta.env.DEV;
const productionIP = "88.222.214.174";

export const baseURL = isDevelopment
  ? "http://localhost:4320"
  : `http://${productionIP}:4320`;
