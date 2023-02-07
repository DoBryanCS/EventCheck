import "./Services.css";
import imageFace from "./face-recognition.png";
import event from "./people.png";
import guest from "./guest-list.png";

export default function Services() {
  return (
    <div className="sections is-third-desktop" style={{ padding: "30px" }}>
      <div className="section" style={{ padding: "5px" }}>
        <div style={{ boxShadow: "1px 1px 10px #888888" }} className="box">
          <div className="columns">
            <div className="column is-one-quarter">
              <img src={imageFace} alt="your-image" />
            </div>
            <div className="column is-three-quarters">
              <p>
                Our app helps organizations verify the identity of attendees in
                real-time, making it easy to determine who is authorized to
                participate. By storing images of authorized attendees in a
                database, we can ensure that only authorized individuals are
                allowed to enter the event.
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
                Our application offers you the possibility to directly add all
                the people you want in a database. Whether these people
                participate in an event or not, they will all be stored in our
                database. When it`&apos;s time to create or modify an event. You
                will only have to tick the people who will be authorized
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
                Our app also offers features for managing the event itself by
                creating, modifying or deleting it. You can keep track of
                important details and whether you`&apos;re organizing a small
                gathering or a large conference, our app makes event management
                a breeze.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
