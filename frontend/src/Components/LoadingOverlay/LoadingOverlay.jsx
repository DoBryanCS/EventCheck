import React from "react";
import "./LoadingOverlay.css";

function LoadingOverlay({ loading }) {
  return loading ? (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  ) : (
    ""
  );
}

export default LoadingOverlay;
