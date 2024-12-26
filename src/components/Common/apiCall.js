import axios from "axios";
import { baseURL } from "./baseURL";

// Reusable API call function with query parameters
export const apiCall = async (
  url,
  method = "GET",
  data = null,
  headers = {},
  params = {}
) => {
  try {
    const API_Point = baseURL + url;
    const response = await axios({
      API_Point,
      method,
      data,
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error.response ? error.response.data : error.message; // Handle errors gracefully
  }
};
