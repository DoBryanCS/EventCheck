import React, { useState } from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";

export default function Navbar() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signinModalOpen, setSigninModalOpen] = useState(false);

  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar-burger");
    const target = document.getElementById(navbar.dataset.target);
    navbar.classList.toggle("is-active");
    target.classList.toggle("is-active");
  };

  return (
    <nav
      className="navbar has-text-weight-bold"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand ml-5 mt-3">
        <a className="navbar-item" href="#">
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
          <a className="navbar-item" href="/">
            HOME
          </a>

          <a className="navbar-item" onClick={() => setSignupModalOpen(true)}>
            SIGN UP
          </a>
          <SignupModal
            signupModalOpen={signupModalOpen}
            setSignupModalOpen={setSignupModalOpen}
            setSigninModalOpen={setSigninModalOpen}
          />

          <a className="navbar-item" onClick={() => setSigninModalOpen(true)}>
            SIGN IN
          </a>
          <SigninModal
            signinModalOpen={signinModalOpen}
            setSigninModalOpen={setSigninModalOpen}
            setSignupModalOpen={setSignupModalOpen}
          />
        </div>
      </div>
    </nav>
  );
}
