import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Live from "./components/Live";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/church-website/" element={<App />} />
        <Route path="/church-website/live" element={<Live />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
