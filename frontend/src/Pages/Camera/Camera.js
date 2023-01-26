import React, { useState, useEffect } from "react";
import "./Camera.css";

const Camera = () => {
  const [videoUrl, setVideoUrl] = useState("http://127.0.0.1:5000/video");

  return (
    <div className="container">
      <h1>Verification</h1>
      <div className="video-container">
        <img src={videoUrl} alt="Video" width="100%" />

        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Camera;
