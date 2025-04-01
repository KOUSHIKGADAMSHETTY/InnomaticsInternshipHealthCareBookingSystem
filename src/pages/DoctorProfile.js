
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDoctorById } from "../api/doctorApi";
import { bookAppointment } from "../api/appointmentApi";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const getDoctor = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctorById(id);
        setDoctor(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getDoctor();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookAppointment(id, date, time);
      setMessage("Appointment booked successfully!");
      setTimeout(() => navigate("/my-appointments"), 2000);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}
      {loading ? (
        <Loader />
      ) : (
        doctor && (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="text-lg text-gray-700">Specialization: {doctor.specialization}</p>
            <p className="text-lg text-gray-700">Experience: {doctor.experience} years</p>
            <p className="text-lg text-gray-700">Rating: ⭐ {doctor.rating}</p>
            <p className="mt-4">{doctor.bio}</p>
            <form onSubmit={handleBooking} className="mt-4">
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
          </div>
        )
      )}
    </div>
  );
};

export default DoctorProfile;