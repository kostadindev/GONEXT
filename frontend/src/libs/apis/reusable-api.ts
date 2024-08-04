import axios from "axios";

export const BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API requests
export const fetchData = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params, withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching data from ${endpoint}:`, error);
    return null;
  }
};