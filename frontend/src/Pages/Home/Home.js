import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
  return (
    <div className="center-button-vh">
      <Link to="/camera">
        <button>Verification Camera</button>
      </Link>
    </div>
  );
};

export default Home;