import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; // Update with backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};