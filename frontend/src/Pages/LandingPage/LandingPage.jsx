import Navbar from "../../Components/Navbar";
import image from "./facial-recognition.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "#69EBFC",
        height: "100vh",
        width: "100vw",
        position: "fixed",
      }}
    >
      <div
        className="landingBox"
        style={{
          borderRadius: "10px",
          position: "fixed",
          top: "8%",
          left: "8%",
          right: "8%",
          bottom: "8%",
          background: "white",
          boxShadow: "30px 30px 50px #888888",
          zIndex: "1",
          pointerEvents: "all",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <div className="columns is-half-desktop" style={{ padding: "30px" }}>
          <div className="column">
          <div className="title is-1">EVENT <span className="colored-word">CHECK</span></div>
            <div className="subtitle is-5 mt-3">
              Our app helps businesses, schools and organizations manage their
              guest lists by storing images and voice recordings of authorized
              attendees in a database. On the day of the event, our app verifies
              attendees' identities in real-time, making it easy to determine
              who is authorized to participate. Our app also offers features for
              event management and guest list management, such as adding,
              deleting and modifying.
            </div>
          </div>
          <div className="column has-text-centered">
            <img style={{ width: "80%" }} src={image}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
