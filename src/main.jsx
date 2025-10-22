import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Live, Resources, DepartmentsPage } from "./components";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/church-website/" element={<App />} />
        <Route path="/church-website/live" element={<Live />} />
        <Route path="/church-website/departments" element={<DepartmentsPage />} />
        <Route path="/church-website/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
