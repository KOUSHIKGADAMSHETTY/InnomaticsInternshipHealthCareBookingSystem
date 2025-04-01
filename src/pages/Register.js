
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerUser(email, password);
      login(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-2 border rounded" required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
