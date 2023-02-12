# cv2 for capturing video from a camera
# face_recognition for performing facial recognition
# connection_database for accessing a Firebase database
import cv2
import face_recognition
from connection_database import db

def get_frame(user_id):

     # Get a reference to the "people" collection
    people_ref = db.collection("companies").document(user_id).collection("people")

    # Get a list of all the documents in the "people" collection
    docs = people_ref.get()

    known_face_encodings = []
    known_face_names = []
    
    # For each document in the "people" collection, retrieve the "fullname" of the person
    # Load the image of their face using the face_recognition.load_image_file method. The image is stored as a .png file in the images/ directory.
    # Use the face_recognition.face_encodings method to get the face encoding for each person in the image. 
    # The face encoding is then added to the known_face_encodings list. The person's "fullname" is also added to the known_face_names list.
    for doc in docs:
       
        fullname = doc.to_dict()["fullname"]
        eli_image = face_recognition.load_image_file(f"images/{user_id}/{doc.id}.png")
        eli_face_encoding = face_recognition.face_encodings(eli_image)
        if eli_face_encoding:
            eli_face_encoding = eli_face_encoding[0]
            known_face_encodings.append(eli_face_encoding)
            known_face_names.append(fullname)

    face_locations = []
    face_encodings = []
    face_names = []
       
    # Start a video capture using the cv2.VideoCapture method, which captures video from the default camera (camera index 0).
    video_capture = cv2.VideoCapture(0)
    print(video_capture.isOpened())
    
    # In the while loop, continuously retrieve the next frame from the video using the video_capture.read method.
    while True:
        is_valid, frame = video_capture.read()

        # If the frame is not valid, break out of the loop.
        if not is_valid:
            break
        else:

            # If the frame is valid, resize it using cv2.resize method and convert it to the RGB color space using the [:, :, ::-1] slicing method.
            small_frame = cv2.resize(frame, (0,0), fx=0.25, fy=0.25)
            rgb_small_frame = small_frame[:, :, ::-1]

            # Use the face_recognition.face_locations method to get the location of each face in the image. 
            face_locations = face_recognition.face_locations(rgb_small_frame)
            # Use the face_recognition.face_encodings method to get the face encoding of each face.
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            faces_names = []

            # Use the face_recognition.compare_faces method to compare each face encoding with the known_face_encodings. 
            # If there is a match, retrieve the corresponding name from the known_face_names list. If there is no match, the face is considered "Unknown".
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(
                    known_face_encodings,
                    face_encoding
                )

                name = "Unknown"

                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]
                faces_names.append(name)

            for (top, right, bottom, left), name in zip(face_locations, faces_names):
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                # Here, the color is set to green ((0, 255, 0)) when the name is a match, and to red ((0, 0, 255)) when the name is "Unknown". 
                # The color is then passed to the cv2.rectangle method to draw the rectangles around the faces with the specified color.
                color = (0, 255, 0)  
                if name == "Unknown":
                    color = (0, 0, 255)
                
                # Use cv2.rectangle method to draw rectangles around each face and add the person's name (or "Unknown") to the image using the cv2.putText method.
                cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), color, cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

            # The frame is converted to JPEG format using cv2.imencode method and is returned as a byte array using the tobytes() method.
            ret,buffer=cv2.imencode('.jpg',frame)
            frame=buffer.tobytes()

        # The get_frame function returns the frames in a generator format using the yield statement, so that each frame can be streamed to a client. 
        # The content type of the frame is specified as "image/jpeg".
        yield(b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

