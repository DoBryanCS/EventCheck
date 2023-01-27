from flask import Flask, render_template, Response
import cv2
import face_recognition
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CORS(app, origins=["http://localhost:3000"])

def get_frame():
    video_capture = cv2.VideoCapture(0)
    print(video_capture.isOpened())
    eli_image = face_recognition.load_image_file('IMG_8791.png')
    eli_face_encoding = face_recognition.face_encodings(eli_image)[0]

    while True:
        is_valid, frame = video_capture.read()

        if not is_valid:
            break
        else:

            small_frame = cv2.resize(frame, (0,0), fx=0.25, fy=0.25)
            rgb_small_frame = small_frame[:, :, ::-1]

            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            faces_names = []
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(
                    [eli_face_encoding],
                    face_encoding
                )

                name = "Unknown"

                if True in matches:
                    first_match_index = matches.index(True)
                    name = "Khoa"
                faces_names.append(name)

            for (top, right, bottom, left), name in zip(face_locations, faces_names):
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                cv2.rectangle(frame, (left, top), (right, bottom), (0,0,255), 2)
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0,0,255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

            ret,buffer=cv2.imencode('.jpg',frame)
            frame=buffer.tobytes()

        yield(b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(get_frame(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)