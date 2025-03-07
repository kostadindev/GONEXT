import axios from "axios";

export const BASE_URL = 'https://gonext.lol:8443/api'; // TODO use env var

// Helper function to handle GET requests
export const fetchData = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params, withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching data from ${endpoint}:`, error);
    return null;
  }
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