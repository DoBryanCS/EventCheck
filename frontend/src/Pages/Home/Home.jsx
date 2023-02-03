import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { auth, db } from "../../firebase-config";
import { ref, onValue } from "firebase/database";
import Navbar from "../../Components/Navbar";
import imageFace from "../Services/face-recognition.png";
import event from "../Services/people.png";
import guest from "../Services/guest-list.png";

function Home() {
  const [companyName, setCompanyName] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        console.log(loggedIn);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
  });

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
          <div
            className="sections"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <div className="section is-one-third mb-4" style={{ padding: "0" }}>
              <p className="has-text-weight-bold" style={{ color: "#333399" }}>
                {companyName}
              </p>
              <div className="title is-1 has-text-centered">Welcome</div>
            </div>
            <div className="section is-two-thirds" style={{ padding: "5px" }}>
              <div className="columns">
                <div className="column is-one-third">
                  <Link to="/camera">
                    <div
                      style={{
                        boxShadow: "1px 1px 10px #888888",
                        height: "100%",
                      }}
                      className="box has-text-centered"
                    >
                      <div className="sections">
                        <div className="section" style={{ padding: "0px" }}>
                          <img
                            className="mt-5"
                            style={{ width: "50%" }}
                            src={imageFace}
                            alt="your-image"
                          />
                        </div>
                        <div className="section">
                          <p>Verification Camera</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="column is-one-third">
                  <Link to="/camera">
                    <div
                      style={{
                        boxShadow: "1px 1px 10px #888888",
                        height: "100%",
                      }}
                      className="box has-text-centered"
                    >
                      <div className="sections">
                        <div className="section" style={{ padding: "0px" }}>
                          <img
                            className="mt-5"
                            style={{ width: "50%" }}
                            src={event}
                            alt="your-image"
                          />
                        </div>
                        <div className="section">
                          <p>Event Management</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="column is-one-third">
                  <Link to="/camera">
                    <div
                      style={{
                        boxShadow: "1px 1px 10px #888888",
                        height: "100%",
                      }}
                      className="box has-text-centered"
                    >
                      <div className="sections">
                        <div className="section" style={{ padding: "0px" }}>
                          <img
                            className="mt-5"
                            style={{ width: "50%" }}
                            src={guest}
                            alt="your-image"
                          />
                        </div>
                        <div className="section">
                          <p>People Database Management</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="column is-fullheight has-text-centered">
            <div className="title is-1">You`&apos;re not connected</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
