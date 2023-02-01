import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Camera from "./Pages/Camera/Camera";
import LandingPage from "./Pages/LandingPage/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
}
