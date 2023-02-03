import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Camera from "./Pages/Camera/Camera";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Services from "./Pages/Services/Services";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/home" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
}
