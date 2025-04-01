import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/appointments";

export const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-appointments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch appointments";
  }
};

export const bookAppointment = async (doctorId, date, time) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/book`,
      { doctorId, date, time },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to book appointment";
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/cancel/${appointmentId}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to cancel appointment";
  }
};
