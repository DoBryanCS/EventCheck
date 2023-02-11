import React from "react";
import "./Camera.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Camera = () => {
  const { currentUser } = useContext(AuthContext);
  const videoUrl = `http://127.0.0.1:5000/video/${currentUser.uid}`;

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
