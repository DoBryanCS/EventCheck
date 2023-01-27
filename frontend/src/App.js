import './App.css';
import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home"
import Camera from "./Pages/Camera/Camera"

export default function App() {

	return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/camera" element={<Camera />} />
				</Routes>
			</BrowserRouter>
	);
}