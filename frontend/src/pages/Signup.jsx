import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", { name, email, password });

      toast.success("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* 🌙 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-xl"
        title="Toggle theme"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>

      <form
        onSubmit={handleSignup}
        className={`w-full max-w-md p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {/* Name */}
        <input
          className={`w-full p-2 mb-3 rounded border outline-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          className={`w-full p-2 mb-3 rounded border outline-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className={`w-full p-2 mb-4 rounded border outline-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
