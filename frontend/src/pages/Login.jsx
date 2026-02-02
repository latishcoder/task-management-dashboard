import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🌙 Global theme (CORRECT)
  const { darkMode, toggleTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      {/* 🌙 Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-xl"
        title="Toggle theme"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>

      {/* 💫 Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-xl shadow-lg p-8 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        {/* 🏷️ Logo + App Name */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📝</div>
          <h2 className="text-2xl font-bold">TaskFlow</h2>
          <p className="text-sm text-gray-400">
            Manage your tasks efficiently
          </p>
        </div>

        {/* ❌ Error */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded">
            {error}
          </div>
        )}

        {/* 🔐 Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="test@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300'
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-400"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* ℹ️ Demo Info */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Demo: <span className="font-medium">test@test.com / 123456</span>
        </p>
      </motion.div>
    </div>
  );
}
