import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">Healthcare Booking</Link>
      <div>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/register" className="mx-2">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
