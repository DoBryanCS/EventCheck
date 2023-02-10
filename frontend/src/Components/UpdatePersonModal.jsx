import React, { useState, useRef, useEffect } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UpdatePersonModal(props) {
  const {
    personDataToUpdate,
    setPersonDataToUpdate,
    updatePersonModalOpen,
    setUpdatePersonModalOpen,
    inputs,
  } = props;

  const { currentUser } = useContext(AuthContext);

  const [file, setFile] = useState("");
  const fileInputRef = useRef(null);
  const [perc, setPerc] = useState(null);

  const [nameFocus, setNameFocus] = useState(true);
  const [emailFocus, setEmailFocus] = useState(true);
  const [ageFocus, setAgeFocus] = useState(true);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      Object.keys(personDataToUpdate).length >= 4 &&
      nameFocus &&
      emailFocus &&
      ageFocus &&
      personDataToUpdate.img !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [personDataToUpdate, nameFocus, emailFocus, ageFocus, file]);

  console.log(personDataToUpdate);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPersonDataToUpdate((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInputChange = (event) => {
    setPersonDataToUpdate({
      ...personDataToUpdate,
      [event.target.id]: event.target.value,
    });
    const id = event.target.id;
    const value = event.target.value;

    if (id === "fullname") {
      if (value === "") {
        setNameFocus(false);
        setNameError("Enter the full name");
      } else {
        setNameFocus(true);
        setNameError("");
      }
    }

    if (id === "email") {
      if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        setEmailFocus(false);
        setEmailError("Invalid email address");
      } else {
        setEmailFocus(true);
        setEmailError("");
      }
    }

    if (id === "age") {
      if (value < 0 || value > 200 || value === "") {
        setAgeFocus(false);
        setAgeError("The age must be between 0 and 200 inclusive");
      } else {
        setAgeFocus(true);
        setAgeError("");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(
        db,
        "companies",
        currentUser.uid,
        "people",
        personDataToUpdate.id
      );

      await updateDoc(docRef, {
        ...personDataToUpdate,
        timeStamp: serverTimestamp(),
      });
      sendUserIdToBackend(currentUser.uid);
      setUpdatePersonModalOpen(false);
      setNameFocus(true);
      setEmailFocus(true);
      setAgeFocus(true);
      setNameError("");
      setEmailError("");
      setAgeError("");
      setFile("");
    } catch (err) {
      console.log(err);
    }
  };

  const sendUserIdToBackend = (userId) => {
    fetch("http://127.0.0.1:5000/get_user_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    updatePersonModalOpen && (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              className="modal-card-title has-text-centered has-text-weight-bold"
              style={{ marginBottom: "0" }}
            >
              Update Person
            </p>
          </header>
          <section className="modal-card-body has-text-centered">
            <div className="field">
              <img
                style={{
                  width: "20%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  boxShadow: "1px 1px 10px #69EBFC",
                }}
                src={
                  personDataToUpdate.img
                    ? personDataToUpdate.img
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="your-image"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                accept="image/*"
                multiple={false}
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {inputs.map((input) => (
              <div key={input.id} className="field">
                <div
                  key={input.id}
                  className="field"
                  style={{
                    boxShadow:
                      (input.id === "email" && !emailFocus) ||
                      (input.id === "age" && !ageFocus) ||
                      (input.id === "fullname" && !nameFocus)
                        ? "1px 1px 10px #cc0000"
                        : "1px 1px 10px #69EBFC",
                  }}
                >
                  <input
                    id={input.id}
                    className="input"
                    type={input.type}
                    placeholder={input.placeholder}
                    value={personDataToUpdate[input.id]}
                    onChange={handleInputChange}
                  />
                </div>
                {input.id === "fullname" && nameError && (
                  <div className="error mb-2 has-text-weight-bold">
                    {nameError}
                  </div>
                )}
                {input.id === "email" && emailError && (
                  <div className="error mb-2 has-text-weight-bold">
                    {emailError}
                  </div>
                )}
                {input.id === "age" && ageError && (
                  <div className="error mb-2 has-text-weight-bold">
                    {ageError}
                  </div>
                )}
              </div>
            ))}
          </section>
          <footer className="modal-card-foot buttons is-centered">
            <button
              className="button has-text-weight-bold"
              onClick={() => {
                setUpdatePersonModalOpen(false);
                setNameFocus(true);
                setEmailFocus(true);
                setAgeFocus(true);
                setNameError("");
                setEmailError("");
                setAgeError("");
                setFile("");
              }}
            >
              Cancel
            </button>
            <button
              disabled={disabled || (perc !== null && perc < 100)}
              style={{ backgroundColor: "#69EBFC" }}
              className="button has-text-white"
              onClick={handleUpdate}
            >
              Update
            </button>
          </footer>
        </div>
      </div>
    )
  );
}