import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import requests
import os

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

    # Check if the user id folder exists, if not create it
    folder_path = f"images/{user_id}"
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Iterate over the documents and print the "img" and "fullname" fields
    for doc in docs:
        img_url = doc.to_dict()["img"]
        response = requests.get(img_url)
        with open(f"{folder_path}/{doc.id}.png", "wb") as f:
            f.write(response.content)
        fullname = doc.to_dict()["fullname"]
        print(doc.id)
        print(f"img: {img_url}")
        print(f"fullname: {fullname}")

def delete_png(user_id, png_id):
    folder_path = f"images/{user_id}/{png_id}.png"
    if os.path.exists(folder_path):
        os.remove(folder_path)
        