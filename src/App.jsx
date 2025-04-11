import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./pages/Login";
import Wordify from "./pages/Wordify";
export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wordify" element={<Wordify />} />
    </Routes>
  );
}
