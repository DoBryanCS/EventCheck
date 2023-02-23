/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react";
import { setDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

export default function AddEventModal(props) {
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);
  const fileInputRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  //title, description, date, time, location, responsable_name, minimum_age, Liste_invites - 8
  const [titleFocus, setTitleFocus] = useState(true);
  const [descriptionFocus, setDescriptionFocus] = useState(true);
  const [dateFocus, setDateFocus] = useState(true);
  const [timeFocus, setTimeFocus] = useState(true);
  const [locationFocus, setLocationFocus] = useState(true);
  const [responsableNameFocus, setResponsableNameFocus] = useState(true);
  const [minimumAgeFocus, setMinimumAgeFocus] = useState(true);
  const [listeInvitesFocus, setlisteInvitesFocus] = useState(true);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [responsableNameError, setResponsableNameError] = useState("");
  const [minimumAgeError, setMinimumAgeError] = useState("");
  const [listeInvitesError, setlisteInvitesError] = useState("");

  const [disabled, setDisabled] = useState(true);

  //const [loading, setLoading] = useState(false);

  const { addEventModalOpen, setAddEventModalOpen, inputs } = props;

  useEffect(() => {
    if (
      Object.keys(data).length >= 7 &&
      titleFocus &&
      descriptionFocus &&
      dateFocus &&
      timeFocus &&
      locationFocus &&
      responsableNameFocus &&
      minimumAgeFocus &&
      listeInvitesFocus
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    data,
    titleFocus,
    descriptionFocus,
    dateFocus,
    timeFocus,
    locationFocus,
    responsableNameFocus,
    minimumAgeFocus,
    listeInvitesFocus,
  ]);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
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
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  /*useEffect(() => {
    const preventClicks = (event) => {
      if (loading) {
        event.preventDefault();
      }
    };
    document.addEventListener("click", preventClicks);
    return () => {
      document.removeEventListener("click", preventClicks);
    };
  }, [loading]);*/

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(
        collection(db, "companies", currentUser.uid, "evenements")
      );
      await setDoc(docRef, {
        ...data,
        timeStamp: serverTimestamp(),
      });
      //sendUserIdToBackend(currentUser.uid);
    } catch (err) {
      console.log(err);
    } finally {
      setAddEventModalOpen(false);
      setTitleFocus(true);
      setDescriptionFocus(true);
      setDateFocus(true);
      setTimeFocus(true);
      setLocationFocus(true);
      setResponsableNameFocus(true);
      setMinimumAgeFocus(true);
      setlisteInvitesFocus(true);
      setTitleError("");
      setDescriptionError("");
      setDateError("");
      setTimeError("");
      setLocationError("");
      setResponsableNameError("");
      setMinimumAgeError("");
      setlisteInvitesError("");
      setData({});
      setFile("");
      setPerc(null);
    }
  };

  /**const sendUserIdToBackend = (userId) => {
    setLoading(true);
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setAddEventModalOpen(false);
        setTitleFocus(true);
        setDescriptionFocus(true);
        setDateFocus(true);
        setTimeFocus(true);
        setLocationFocus(true);
        setResponsableNameFocus(true);
        setMinimumAgeFocus(true);
        setlisteInvitesFocus(true);
        setTitleError("");
        setDescriptionError("");
        setDateError("");
        setTimeError("");
        setLocationError("");
        setResponsableNameError("");
        setMinimumAgeError("");
        setlisteInvitesError("");
        setFile("");
        setData({});
      });
  };*/

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "Title") {
      if (value === "") {
        setTitleFocus(false);
        setTitleError("Enter the title");
      } else {
        setTitleFocus(true);
        setTitleError("");
      }
    }

    if (id === "Description") {
      if (value === "") {
        setDescriptionFocus(false);
        setDescriptionError("Enter the description");
      } else {
        setDescriptionFocus(true);
        setDescriptionError("");
      }
    }

    if (id === "Date") {
      if (value === "") {
        setDateFocus(false);
        setDateError("Enter the date");
      } else {
        setDateFocus(true);
        setDateError("");
      }
    }

    if (id === "Time") {
      if (value === "") {
        setTimeFocus(false);
        setTimeError("Enter the time");
      } else {
        setTimeFocus(true);
        setTimeError("");
      }
    }

    if (id === "Location") {
      if (value === "") {
        setLocationFocus(false);
        setLocationError("Enter the location");
      } else {
        setLocationFocus(true);
        setLocationError("");
      }
    }

    if (id === "ResponsableName") {
      if (value === "") {
        setResponsableNameFocus(false);
        setResponsableNameError("Enter the responsable name");
      } else {
        setResponsableNameFocus(true);
        setResponsableNameError("");
      }
    }

    if (id === "MinimumAge") {
      if (value < 0 || value > 200) {
        setMinimumAgeFocus(false);
        setMinimumAgeError("The age must be between 0 and 200 inclusive");
      } else {
        setMinimumAgeFocus(true);
        setMinimumAgeError("");
      }
    }

    if (id === "ListeInvites") {
      if (value === {}) {
        setlisteInvitesFocus(false);
        setlisteInvitesError("Enter the liste invites");
      } else {
        setlisteInvitesFocus(true);
        setlisteInvitesError("");
      }
    }

    setData({ ...data, [id]: value });
  };

  return (
    addEventModalOpen && (
      <>
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            {/**<LoadingOverlay loading={loading} />*/}
            <header className="modal-card-head">
              <p
                className="modal-card-title has-text-centered has-text-weight-bold"
                style={{ marginBottom: "0" }}
              >
                Add a new Event
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
                    file
                      ? URL.createObjectURL(file)
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
                        (input.id === "Title" && !titleFocus) ||
                        (input.id === "Description" && !descriptionFocus) ||
                        (input.id === "Date" && !dateFocus) ||
                        (input.id === "Time" && !timeFocus) ||
                        (input.id === "Location" && !locationFocus) ||
                        (input.id === "ResponsableName" && !responsableNameFocus) ||
                        (input.id === "MinimumAge" && !minimumAgeFocus) ||
                        (input.id === "ListeInvites" && !listeInvitesFocus)
                          ? "1px 1px 10px #cc0000"
                          : "1px 1px 10px #69EBFC",
                    }}
                  >
                    <input
                      id={input.id}
                      className="input"
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  </div>
                  {input.id === "Title" && titleError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {titleError}
                      </div>
                  )}
                  {input.id === "Description" && descriptionError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {descriptionError}
                      </div>
                  )}
                  {input.id === "Date" && dateError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {dateError}
                      </div>
                  )}
                  {input.id === "Time" && timeError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {timeError}
                      </div>
                  )}
                  {input.id === "Location" && locationError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {locationError}
                      </div>
                  )}
                  {input.id === "ResponsableName" && responsableNameError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {responsableNameError}
                      </div>
                  )} 
                  {input.id === "MinimumAge" && minimumAgeError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {minimumAgeError}
                      </div>
                  )}
                  {input.id === "ListeInvites" && listeInvitesError && (
                    <div className="error mb-2 has-text-weight-bold">
                      {listeInvitesError}
                      </div>
                  )}
                </div>
              ))}
            </section>
            <footer className="modal-card-foot buttons is-centered">
              <button
                className="button has-text-weight-bold"
                onClick={() => {
                  setAddEventModalOpen(false);
                  setTitleFocus(true);
                  setDescriptionFocus(true);
                  setDateFocus(true);
                  setTimeFocus(true);
                  setLocationFocus(true);
                  setResponsableNameFocus(true);
                  setMinimumAgeFocus(true);
                  setlisteInvitesFocus(true);
                  setTitleError("");
                  setDescriptionError("");
                  setDateError("");
                  setTimeError("");
                  setLocationError("");
                  setResponsableNameError("");
                  setMinimumAgeError("");
                  setlisteInvitesError("");
                  setFile("");
                  setData({});
                }}
              >
                Cancel
              </button>
              <button
                disabled={disabled || (perc !== null && perc < 100)}
                style={{ backgroundColor: "#69EBFC" }}
                className="button has-text-white"
                onClick={handleAdd}
              >
                Send
              </button>
            </footer>
          </div>
        </div>
      </>
    )
  );
}
