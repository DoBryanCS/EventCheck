import React, { useState } from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar(props) {
  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar-burger");
    const target = document.getElementById(navbar.dataset.target);
    navbar.classList.toggle("is-active");
    target.classList.toggle("is-active");
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    props.setSigninModalOpen(false);
  };

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
          {currentUser ? (
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
                setSigninModalOpen={props.setSigninModalOpen}
              />

              <a
                className="navbar-item"
                onClick={() => props.setSigninModalOpen(true)}
              >
                SIGN IN
              </a>
              <SigninModal
                signinModalOpen={props.signinModalOpen}
                setSigninModalOpen={props.setSigninModalOpen}
                setSignupModalOpen={setSignupModalOpen}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
