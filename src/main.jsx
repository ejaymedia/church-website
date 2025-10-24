import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Live, Resources, DepartmentsPage, AdminLogin, AdminDashboard } from "./components";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; // ✅
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ move AuthProvider inside BrowserRouter */}
      <AuthProvider>
        <Routes>
          <Route path="/church-website/" element={<App />} />
          <Route path="/church-website/live" element={<Live />} />
          <Route path="/church-website/departments" element={<DepartmentsPage />} />
          <Route path="/church-website/resources" element={<Resources />} />
          <Route path="/church-website/admin-login" element={<AdminLogin />} />

          <Route
            path="/church-website/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);