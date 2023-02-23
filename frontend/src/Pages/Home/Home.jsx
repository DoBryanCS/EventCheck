import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import imageFace from "../Services/face-recognition.png";
import event from "../Services/people.png";
import guest from "../Services/guest-list.png";

function Home() {
  return (
    <div
      className="sections"
      style={{ paddingLeft: "30px", paddingRight: "30px" }}
    >
      <div className="section is-one-third mb-4" style={{ padding: "0" }}>
        <p className="has-text-weight-bold" style={{ color: "#333399" }}>
          Company Name
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
                    <p>Real Time Verification</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="column is-one-third">
            <Link to="/evenement">
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
            <Link to="/database">
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
  );
}

export default Home;
