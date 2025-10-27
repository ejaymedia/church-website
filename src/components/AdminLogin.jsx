import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard"); // redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4 sm:px-6 md:px-8">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md border border-green-100"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-green-800 text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm sm:text-base"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-green-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-md transition text-sm sm:text-base"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;