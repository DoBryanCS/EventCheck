import React from "react";
import "./Camera.css";

const Camera = () => {
  const videoUrl = "http://127.0.0.1:5000/video";

  return (
    <div className="container">
      <div className=" title is-4">Verification</div>
      <div className="video-container">
        <img src={videoUrl} alt="Video" width="100%" />

        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Camera;