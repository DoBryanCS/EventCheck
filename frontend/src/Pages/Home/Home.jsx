import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { auth, db } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, push, onValue } from "firebase/database";
import Navbar from "../../Components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(null);

  useEffect(() => {
    const storedCompanyName = localStorage.getItem("companyName");
    if (localStorage.getItem("email") !== "") {
      if (storedCompanyName) {
        setCompanyName(storedCompanyName);
      } else {
        const emailRef = ref(
          db,
          "companies/" + localStorage.getItem("email").replace(".", "")
        );
        onValue(emailRef, (snapshot) => {
          const data = snapshot.val();
          setCompanyName(data.company_name);
          localStorage.setItem("companyName", data.company_name);
        });
      }
    }
  }, []);

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
          <div className="center-button-vh">
            <Link to="/camera">
              <button>Verification Camera</button>
            </Link>
            <p>Company name: {companyName}</p>
          </div>
        ) : (
          <div className="center-button-vh">
            <p>You're not connected</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
