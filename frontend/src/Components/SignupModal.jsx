import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";

export default function SignupModal(props) {
  const navigate = useNavigate();
  const { signupModalOpen, setSignupModalOpen, setSigninModalOpen } = props;

  const [isFormValid, setIsFormValid] = useState(false);

  const [emailFocus, setEmailFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(true);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      set(ref(db, "companies/" + email.replace(".", "")), {
        company_name: name,
      });
      localStorage.setItem("email", email);
      console.log(user);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      name !== "" &&
      password !== "" &&
      email !== "" &&
      confirmPassword !== "" &&
      emailFocus &&
      passwordFocus &&
      confirmPasswordFocus
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    name,
    password,
    email,
    confirmPassword,
    emailFocus,
    passwordFocus,
    confirmPasswordFocus,
  ]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  const validateConfirmPassword = (confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordFocus(false);
      setConfirmPasswordError("The passwords are not identical");
    } else {
      setConfirmPassword(confirmPassword);
      setConfirmPasswordFocus(true);
      setConfirmPasswordError("");
    }
  };

  const validateEmail = (email) => {
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      setEmailFocus(false);
      setEmailError("Invalid email address");
    } else {
      setEmail(email);
      setEmailFocus(true);
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (!/^.{8,}$/.test(password)) {
      setPasswordFocus(false);
      setPasswordError("Password must be at least 8 characters long");
    } else if (
      !/[!@#\$%\^&\*\(\)\_\-\+\=\{\}\[\]\\\|:\";'<>,\.\?\/]/.test(password)
    ) {
      setPasswordFocus(false);
      setPasswordError("The password must have at least one special character");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordFocus(false);
      setPasswordError("The password must have at least one uppercase letter");
    } else if (!/[a-z]/.test(password)) {
      setPasswordFocus(false);
      setPasswordError("The password must have at least one lowercase letter");
    } else if (!/[0-9]/.test(password)) {
      setPasswordFocus(false);
      setPasswordError("The password must have at least one digit");
    } else {
      setPassword(password);
      setPasswordFocus(true);
      setPasswordError("");
    }
  };

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
                  type="text"
                  placeholder="Organization's, business's, school's name"
                  onChange={(e) => handleNameChange(e)}
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
                  : "1px 1px 10px #cc0000",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="E-mail"
                  onChange={(event) => validateEmail(event.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            {emailError && <div className="error mb-2">{emailError}</div>}
            <div
              className="field"
              style={{
                boxShadow: passwordFocus
                  ? "1px 1px 10px #69EBFC"
                  : "1px 1px 10px #cc0000",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={(event) => validatePassword(event.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            {passwordError && <div className="error mb-2">{passwordError}</div>}
            <div
              className="field"
              style={{
                boxShadow: confirmPasswordFocus
                  ? "1px 1px 10px #69EBFC"
                  : "1px 1px 10px #cc0000",
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(event) =>
                    validateConfirmPassword(event.target.value)
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            {confirmPasswordError && (
              <div className="error mb-2">{confirmPasswordError}</div>
            )}
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
              onClick={() => {
                setSignupModalOpen(false);
                setEmailFocus(true);
                setPasswordFocus(true);
                setConfirmPasswordFocus(true);
                setEmailError("");
                setPasswordError("");
                setConfirmPasswordError("");
              }}
            >
              Cancel
            </button>
            <button
              style={{ backgroundColor: "#69EBFC" }}
              className="button has-text-white"
              disabled={!isFormValid}
              onClick={register}
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
