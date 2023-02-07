import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Camera from "./Pages/Camera/Camera";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Services from "./Pages/Services/Services";
import PeopleDatabase from "./Pages/PeopleDatabase/PeopleDatabase";
import AddPerson from "./Pages/AddPerson/AddPerson";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export default function App() {
  const { currentUser } = useContext(AuthContext);

  const [signinModalOpen, setSigninModalOpen] = useState(false);

  const RequireAuth = ({ children }) => {
    return currentUser
      ? children
      : (setSigninModalOpen(true), (<Navigate to="/" />));
  };
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#69EBFC",
          height: "100vh",
          width: "100vw",
          position: "fixed",
        }}
      >
        <div
          className="landingBox"
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
          <Navbar
            signinModalOpen={signinModalOpen}
            setSigninModalOpen={setSigninModalOpen}
          />

          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/services" element={<Services />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/database"
              element={
                <RequireAuth>
                  <PeopleDatabase />
                </RequireAuth>
              }
            />
            <Route
              path="/addPerson"
              element={
                <RequireAuth>
                  <AddPerson />
                </RequireAuth>
              }
            />
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
