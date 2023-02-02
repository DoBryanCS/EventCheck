import React, { useState, useEffect } from "react";
import "./Camera.css";
import Navbar from "../../Components/Navbar";

const Camera = () => {
  const [videoUrl, setVideoUrl] = useState("http://127.0.0.1:5000/video");

  return (
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
        <Navbar />
        {localStorage.getItem("email") !== "" ? (
          <div className="container">
            <h1>Verification</h1>
            <div className="video-container">
              <img src={videoUrl} alt="Video" width="100%" />

              <p className="loading-text">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="center-button-vh">
            <p>You're not connected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
