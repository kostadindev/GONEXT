import axios from "axios";

// Ensure BACKEND_URL is properly read from environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error("REACT_APP_BACKEND_URL is not defined in environment variables.");
}

export const BASE_URL = `${BACKEND_URL}/api`;

// Helper function to handle GET requests
export const fetchData = async (endpoint: string, params: Record<string, any> = {}) => {
  const response = await axios.get(`${BASE_URL}/${endpoint}`, { params, withCredentials: true });
  return response.data;
};

// Helper function to handle POST requests
export const postData = async (endpoint: string, data: Record<string, any> = {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error posting data to ${endpoint}:`, error);
    return null;
  }
};

// Helper function to handle PUT requests
export const putData = async (endpoint: string, data: Record<string, any> = {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error putting data to ${endpoint}:`, error);
    return null;
  }
};

// Helper function to handle DELETE requests
export const deleteData = async (endpoint: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error deleting data from ${endpoint}:`, error);
    return null;
  }
};
