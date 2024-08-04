import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "./reusable-api";


export const fetchUser = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, { withCredentials: true });
    return response?.data?.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Function to handle login success
export const handleLoginSuccess = async (token: string): Promise<any> => {
  try {
    await axios.post(`${BASE_URL}/auth/google`, { token }, { withCredentials: true });
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// Function to handle logout
export const handleLogout = async (): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};