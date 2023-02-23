import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Camera from "./Pages/Camera/Camera";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Services from "./Pages/Services/Services";
import PeopleDatabase from "./Pages/PeopleDatabase/PeopleDatabase";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export default function App() {
  // Access the currentUser value from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Define a state variable to control the visibility of the sign-in modal
  const [signinModalOpen, setSigninModalOpen] = useState(false);

  // Define a component that requires authentication to access
  const RequireAuth = ({ children }) => {
    // If the user is authenticated, render the children
    // Otherwise, redirect the user to the landing page
    return currentUser
      ? children
      : (setSigninModalOpen(true), (<Navigate to="/" />));
  };

  // Render the application
  return (
    <BrowserRouter>
      <div
        className="background"
        // Add any additional styling to the background element
      >
        <div
          className="landingBox"
          // Add any additional styling to the landingBox element
          style={{
            borderRadius: "10px",
            position: "fixed",
            top: "8%",
            left: "8%",
            right: "8%",
            bottom: "8%",
            background: "white",
            boxShadow: "30px 30px 50px #888888",
            zIndex: "1",
            pointerEvents: "all",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {/* Render the navbar component */}
          <Navbar
            signinModalOpen={signinModalOpen}
            setSigninModalOpen={setSigninModalOpen}
          />

          {/* Render the page content using React Router */}
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/services" element={<Services />} />

            {/* Render the Home component within the RequireAuth component */}
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />

            {/* Render the PeopleDatabase component within the RequireAuth component */}
            <Route
              path="/database"
              element={
                <RequireAuth>
                  <PeopleDatabase />
                </RequireAuth>
              }
            />

            {/* Render the Camera component within the RequireAuth component */}
            <Route
              path="/camera"
              element={
                <RequireAuth>
                  <Camera />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
