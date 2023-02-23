import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

// Define the SignupModal component and export it
export default function SignupModal(props) {
  // Set up navigation hook
  const navigate = useNavigate();

  // Extract dispatch from the context provider
  const { dispatch } = useContext(AuthContext);

  // Destructure props
  const { signupModalOpen, setSignupModalOpen, setSigninModalOpen } = props;

  // Set up form validation state and state for input focus
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(true);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(true);

  // Set up state for user input values and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Define a function to register a new user
  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Dispatch a login action to the context provider with the user data
      dispatch({ type: "LOGIN", payload: res.user });
      // Navigate to the home page
      navigate("/home");
      // Close the SignupModal
      setSignupModalOpen(false);
      // Create an empty document in the "companies" collection with the user ID
      await setDoc(doc(db, "companies", res.user.uid), {});
    } catch (error) {
      console.log(error);
    }
  };

  // Set up an effect to validate the form
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

  // Define a function to handle changes to the name input
  function handleNameChange(e) {
    setName(e.target.value);
  }

  // Define a function to validate the confirm password input
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

  // Define a function to validate the email input
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

  // Define a function to validate the password input
  const validatePassword = (password) => {
    if (!/^.{8,}$/.test(password)) {
      setPasswordFocus(false);
      setPasswordError("Password must be at least 8 characters long");
    } else if (!/[!@#$%^&*()_\-+={}[\]\\|:";'<>,.?/]/.test(password)) {
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

  // Render the SignupModal component if the signupModalOpen state is true
  if (signupModalOpen) {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            {/* Render the title of the modal */}
            <p
              className="modal-card-title has-text-centered"
              style={{ marginBottom: "0" }}
            >
              Sign Up
            </p>
          </header>
          <section className="modal-card-body has-text-centered">
            {/* Render the input fields for the user's name, email, and password */}
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
                  ? "1px 1px 10px #69EBFC" // Change the box shadow if the email field is focused
                  : "1px 1px 10px #cc0000", // Change the box shadow if there's an error with the email
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="E-mail"
                  onChange={(event) => validateEmail(event.target.value)} // Validate the email address when the user types
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
             {/* Render an error message if there's an issue with the email address */}
            {emailError && <div className="error mb-2">{emailError}</div>}
            <div
              className="field"
              style={{
                boxShadow: passwordFocus
                  ? "1px 1px 10px #69EBFC" // Change the box shadow if the password field is focused
                  : "1px 1px 10px #cc0000", // Change the box shadow if there's an error with the password
              }}
            >
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={(event) => validatePassword(event.target.value)} // Validate the password when the user types
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
             {/* Render an error message if there's an issue with the password */}
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
                    validateConfirmPassword(event.target.value) // Validate the confirmPassword when the user types
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
             {/* Render an error message if there's an issue with the confirmPassword */}
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
             {/* Reset all focus and error states and close the modal*/}
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
