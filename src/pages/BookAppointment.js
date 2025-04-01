import React, { useState } from "react";
import { bookAppointment } from "../api/appointmentApi";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const BookAppointment = () => {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await bookAppointment(doctorId, date, time);
      setMessage("Appointment booked successfully!");
      setDoctorId("");
      setDate("");
      setTime("");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Book an Appointment</h1>
      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Book Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;