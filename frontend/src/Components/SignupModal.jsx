import React, { useState } from "react";

export default function SignupModal(props) {
  const { signupModalOpen, setSignupModalOpen, setSigninModalOpen } = props;
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  if (signupModalOpen) {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              className="modal-card-title has-text-centered"
              style={{ marginBottom: "0" }}
            >
              Sign Up
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setSignupModalOpen(false)}
            ></button>
          </header>
          <section className="modal-card-body has-text-centered">
            <div
              className="field"
              style={{
                boxShadow: nameFocus
                  ? "1px 1px 10px #69EBFC"
                  : "1px 1px 10px #888888",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Organization's, business's, school's name"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
            </div>
            <div
              className="field"
              style={{
                boxShadow: emailFocus
                  ? "1px 1px 10px #69EBFC"
                  : "1px 1px 10px #888888",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="E-mail"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div
              className="field"
              style={{
                boxShadow: passwordFocus
                  ? "1px 1px 10px #69EBFC"
                  : "1px 1px 10px #888888",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div
              className="field"
              style={{
                boxShadow: confirmPasswordFocus
                  ? "1px 1px 10px #69EBFC"
                  : "1px 1px 10px #888888",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm password"
                  onFocus={() => setConfirmPasswordFocus(true)}
                  onBlur={() => setConfirmPasswordFocus(false)}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control">
                Already have an account?{" "}
                <a
                  onClick={() => {
                    setSignupModalOpen(false);
                    setSigninModalOpen(true);
                  }}
                >
                  Sign In
                </a>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot buttons is-centered">
            <button
              className="button has-text-weight-bold"
              onClick={() => setSignupModalOpen(false)}
            >
              Cancel
            </button>
            <button
              style={{ backgroundColor: "#69EBFC" }}
              className="button has-text-white"
            >
              Sign Up
            </button>
          </footer>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
