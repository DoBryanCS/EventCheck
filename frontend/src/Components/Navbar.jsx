import React, { useState } from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar(props) {
  // get the current user object from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // get the dispatch function from the AuthContext
  const { dispatch } = useContext(AuthContext);

  // get the navigate function from react-router-dom
  const navigate = useNavigate();

  // state variable to keep track of whether the signup modal is open
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  // function to toggle the navbar menu on and off
  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar-burger");
    const target = document.getElementById(navbar.dataset.target);
    navbar.classList.toggle("is-active");
    target.classList.toggle("is-active");
  };

  // function to handle user logout
  const logout = () => {
    // dispatch the LOGOUT action to the AuthContext reducer
    dispatch({ type: "LOGOUT" });
    // navigate the user back to the home page
    navigate("/");
    // close the signin modal, if it is open
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

        {/* button to toggle the navbar menu */}
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

      {/* navbar menu */}
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end mr-5 mt-3">
          {currentUser ? (
            <>
              {/* links to home and services pages */}
              <a className="navbar-item" href="/home">
                HOME
              </a>
              <a className="navbar-item" href="/services">
                SERVICES
              </a>
              {/* link to log out and call the logout function */}
              <a className="navbar-item" onClick={logout}>
                LOGOUT
              </a>
            </>
          ) : (
            // if user is not logged in
            <>
              {/* link to services page */}
              <a className="navbar-item" href="/services">
                SERVICES
              </a>
              {/* button to open the signup modal */}
              <a
                className="navbar-item"
                onClick={() => setSignupModalOpen(true)}
              >
                SIGN UP
              </a>
              {/* signup modal component */}
              <SignupModal
                signupModalOpen={signupModalOpen}
                setSignupModalOpen={setSignupModalOpen}
                setSigninModalOpen={props.setSigninModalOpen}
              />
              {/* button to open the signin modal */}
              <a
                className="navbar-item"
                onClick={() => props.setSigninModalOpen(true)}
              >
                SIGN IN
              </a>
              {/* signin modal component */}
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
