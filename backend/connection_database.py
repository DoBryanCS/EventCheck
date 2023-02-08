import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import requests

# Initialize the Firebase app
cred = credentials.Certificate('./trueidentity-944f1-firebase-adminsdk-tpyb6-ead899ec77.json')
firebase_admin.initialize_app(cred)

# Get a reference to the Firestore database
db = firestore.client()

def get_user_data(user_id):
    # Get a reference to the "people" collection
    people_ref = db.collection("companies").document(user_id).collection("people")

    # Get a list of all the documents in the "people" collection
    docs = people_ref.get()

    # Iterate over the documents and print the "img" and "fullname" fields
    for doc in docs:
        img_url = doc.to_dict()["img"]
        response = requests.get(img_url)
        with open(f"images/{doc.id}.png", "wb") as f:
            f.write(response.content)
        fullname = doc.to_dict()["fullname"]
        print(doc.id)
        print(f"img: {img_url}")
        print(f"fullname: {fullname}")