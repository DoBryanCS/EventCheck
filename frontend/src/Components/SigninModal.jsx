import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function SigninModal(props) {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const { signinModalOpen, setSigninModalOpen, setSignupModalOpen } = props;

  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/home");
        setSigninModalOpen(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    signinModalOpen && (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              className="modal-card-title has-text-centered"
              style={{ marginBottom: "0" }}
            >
              Sign In
            </p>
          </header>
          <section className="modal-card-body has-text-centered">
            <div
              className="field"
              style={{
                boxShadow: "1px 1px 10px #69EBFC",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => handleEmailChange(e)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div
              className="field"
              style={{
                boxShadow: "1px 1px 10px #69EBFC",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handlePasswordChange(e)}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            {error && <span>Wrong email or password!</span>}
            <div className="field">
              <div className="control">
                Don&apos;t have an account?{" "}
                <a
                  onClick={() => {
                    setSigninModalOpen(false);
                    setSignupModalOpen(true);
                  }}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot buttons is-centered">
            <button
              className="button has-text-weight-bold"
              onClick={() => setSigninModalOpen(false)}
            >
              Cancel
            </button>
            <button
              style={{ backgroundColor: "#69EBFC" }}
              className="button has-text-white"
              onClick={login}
            >
              Sign In
            </button>
          </footer>
        </div>
      </div>
    )
  );
}
