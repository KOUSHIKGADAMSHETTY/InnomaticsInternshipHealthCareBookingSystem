
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/doctors";

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch doctors";
  }
};

export const fetchDoctorById = async (doctorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch doctor details";
  }
};

export const addDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, doctorData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add doctor";
  }
};

export const updateDoctor = async (doctorId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${doctorId}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update doctor";
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete doctor";
  }
};
