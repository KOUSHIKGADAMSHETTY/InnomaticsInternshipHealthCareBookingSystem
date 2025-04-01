import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <div className="mt-4">
        <Link to="/book-appointment" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Book Appointment</Link>
        <Link to="/my-appointments" className="bg-green-500 text-white px-4 py-2 rounded">My Appointments</Link>
      </div>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default Dashboard;