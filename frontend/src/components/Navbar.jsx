import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="font-bold text-2xl text-gray-800 hover:text-blue-500 transition-colors">
        MyBlog
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            Hello, <span className="font-semibold">{user.name}</span>
          </span>
          <Link
            to="/create"
            className="bg-blue-500 text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Create Post
          </Link>
          <button
            onClick={logout}
            className="bg-gray-800 text-white px-4 py-1 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link className="text-gray-700 hover:text-blue-500 transition" to="/login">
            Login
          </Link>
          <Link
            className="bg-blue-500 text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-600 transition"
            to="/register"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
