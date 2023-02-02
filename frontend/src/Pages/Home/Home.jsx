import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { auth } from "../../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { withAuth } from "../../Components/withAuth";

function Home() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className="center-button-vh">
      <Link to="/camera">
        <button>Verification Camera</button>
      </Link>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

export default withAuth(Home);
