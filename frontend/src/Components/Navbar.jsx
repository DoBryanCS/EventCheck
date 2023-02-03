import React, { useState, useEffect } from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signinModalOpen, setSigninModalOpen] = useState(false);
  const [user, setUser] = useState("");

  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar-burger");
    const target = document.getElementById(navbar.dataset.target);
    navbar.classList.toggle("is-active");
    target.classList.toggle("is-active");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(localStorage.getItem("email"));
      } else {
        setUser(localStorage.setItem("email", ""));
        localStorage.setItem("companyName", "");
      }
    });
  }, [auth]);

  return (
    <nav
      className="navbar has-text-weight-bold"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand ml-5 mt-3">
        <a className="navbar-item" href="/">
          LOGO
        </a>

        <a
          role="button"
          className="navbar-burger burger mr-5 mt-3"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end mr-5 mt-3">
          {localStorage.getItem("email") ? (
            <>
              <a className="navbar-item" href="/home">
                HOME
              </a>
              <a className="navbar-item" href="/services">
                SERVICES
              </a>
              <a className="navbar-item" onClick={logout}>
                LOGOUT
              </a>
            </>
          ) : (
            <>
              <a className="navbar-item" href="/services">
                SERVICES
              </a>
              <a
                className="navbar-item"
                onClick={() => setSignupModalOpen(true)}
              >
                SIGN UP
              </a>
              <SignupModal
                signupModalOpen={signupModalOpen}
                setSignupModalOpen={setSignupModalOpen}
                setSigninModalOpen={setSigninModalOpen}
              />

              <a
                className="navbar-item"
                onClick={() => setSigninModalOpen(true)}
              >
                SIGN IN
              </a>
              <SigninModal
                signinModalOpen={signinModalOpen}
                setSigninModalOpen={setSigninModalOpen}
                setSignupModalOpen={setSignupModalOpen}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
