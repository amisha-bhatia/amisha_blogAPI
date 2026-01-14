import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-100 p-4 flex justify-between">
      <Link to="/">Home</Link>
      {user ? (
        <div className="flex items-center gap-4">
          <span>Hello, {user.name}</span>
          <Link to="/create" className="ml-4 text-blue-500">Create Post</Link>
          <button onClick={logout} className="bg-black text-white px-2 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
