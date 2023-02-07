import image from "./facial-recognition.png";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      className="columns is-half-desktop is-vcentered"
      style={{ padding: "30px" }}
    >
      <div className="column ml-5">
        <div className="title is-1">
          EVENT <span className="colored-word">CHECK</span>
        </div>
        <div className="subtitle is-5 mt-3">
          Ensure event security with ease. Manage your guest lists effortlessly
          with our innovative app.
        </div>
        <button
          style={{ backgroundColor: "#333399" }}
          className="button has-text-white"
          onClick={() => navigate("/services")}
        >
          WHAT WE DO
        </button>
      </div>
      <div className="column has-text-centered">
        <img style={{ width: "80%" }} src={image}></img>
      </div>
    </div>
  );
}
