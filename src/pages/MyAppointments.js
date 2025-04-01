
import React, { useState, useEffect } from "react";
import { fetchAppointments, cancelAppointment } from "../api/appointmentApi";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true);
      try {
        const data = await fetchAppointments();
        setAppointments(data.appointments);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getAppointments();
  }, []);

  const handleCancel = async (id) => {
    setLoading(true);
    try {
      await cancelAppointment(id);
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      setMessage("Appointment cancelled successfully!");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Appointments</h1>
      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}
      {loading ? (
        <Loader />
      ) : appointments.length === 0 ? (
        <p className="text-gray-700">No appointments booked.</p>
      ) : (
        <ul className="mt-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="bg-gray-100 p-4 mb-2 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{appointment.doctor.name}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
              </div>
              <button onClick={() => handleCancel(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
