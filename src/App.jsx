import React, { useEffect } from "react";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Wordify from "./pages/Wordify";

// Envoltura para usar navigate desde App
function AppWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.local.get(["access_token"], function (data) {
      if (data.access_token) {
        console.log("Usuario ya autenticado. Redirigiendo a wordify.html...");
        navigate("/wordify");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/wordify" element={<Wordify />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  );
}
