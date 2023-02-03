import Navbar from "../../Components/Navbar";
import "./Services.css";
import imageFace from "./face-recognition.png";
import event from "./people.png";
import guest from "./guest-list.png";

export default function Services() {
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
        <div className="sections is-third-desktop" style={{ padding: "30px" }}>
          <div className="section" style={{ padding: "5px" }}>
            <div style={{ boxShadow: "1px 1px 10px #888888" }} className="box">
              <div className="columns">
                <div className="column is-one-quarter">
                  <img src={imageFace} alt="your-image" />
                </div>
                <div className="column is-three-quarters">
                  <p>
                    Our app helps organizations verify the identity of attendees
                    in real-time, making it easy to determine who is authorized
                    to participate. By storing images and voice recordings of
                    authorized attendees in a database, we can ensure that only
                    authorized individuals are allowed to enter the event.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="section" style={{ padding: "5px" }}>
            <div style={{ boxShadow: "1px 1px 10px #888888" }} className="box">
              <div className="columns">
                <div className="column is-one-quarter">
                  <img src={guest} alt="your-image" />
                </div>
                <div className="column is-three-quarters">
                  <p>
                    Our app offers features for managing the guest list, making
                    it easy for organizations to keep track of who has been
                    invited and who has confirmed their attendance. You can add
                    and delete guests on the list as needed, ensuring that you
                    always have an up-to-date record of who will be attending
                    your event.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="section" style={{ padding: "5px" }}>
            <div style={{ boxShadow: "1px 1px 10px #888888" }} className="box">
              <div className="columns">
                <div className="column is-one-quarter">
                  <img src={event} alt="your-image" />
                </div>
                <div className="column is-three-quarters">
                  <p>
                    In addition to managing guest lists, our app also offers
                    features for managing the event itself. You can keep track
                    of important details and whether you're organizing a small
                    gathering or a large conference, our app makes event
                    management a breeze.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
