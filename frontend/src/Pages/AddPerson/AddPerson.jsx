import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
const AddPerson = () => {
  const [file, setFile] = useState("");
  return (
    <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      <div
        className="columns is-full"
        style={{
          boxShadow: "1px 1px 10px #888888",
          padding: "20px",
          marginTop: "50px",
        }}
      >
        <div
          className="column is-one-third"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="sections">
            <div className="section has-text-centered">
              <img
                style={{
                  width: "50%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt="your-image"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <form style={{ width: "100%" }}>
            <div className="columns">
              <div className="column is-half">
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>

                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <div className="formInput">
                  <label>Fullname</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    style={{
                      boxShadow: "1px 1px 10px #69EBFC",
                    }}
                  />
                </div>
                <div className="formInput">
                  <label>Adress</label>
                  <input
                    type="text"
                    placeholder="Elton St. 216 NewYork"
                    style={{
                      boxShadow: "1px 1px 10px #69EBFC",
                    }}
                  />
                </div>
              </div>
              <div className="column is-half">
                <div className="formInput">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 234 456 89"
                    style={{
                      boxShadow: "1px 1px 10px #69EBFC",
                    }}
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    style={{
                      boxShadow: "1px 1px 10px #69EBFC",
                    }}
                  />
                </div>

                <div className="formInput">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="USA"
                    style={{
                      boxShadow: "1px 1px 10px #69EBFC",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-buttons">
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;
