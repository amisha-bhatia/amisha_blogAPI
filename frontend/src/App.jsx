import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import { AuthProvider } from "./context/AuthContext"; 
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="p-4">404 Not Found</div>} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}