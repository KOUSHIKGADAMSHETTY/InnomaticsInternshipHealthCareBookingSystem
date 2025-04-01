import React, { useState, useEffect } from "react";
import { fetchDoctors } from "../api/doctorApi";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data.doctors);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getDoctors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Available Doctors</h1>
      {error && <Alert type="error" message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">{doctor.name}</h2>
              <p>Specialization: {doctor.specialization}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Rating: ⭐ {doctor.rating}</p>
              <Link to={`/doctor/${doctor.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorList;

