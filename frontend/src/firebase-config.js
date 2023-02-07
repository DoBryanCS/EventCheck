import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpbNDO9eW-1lCOyVvaMMn9t9-g6R6O9Ng",
  authDomain: "trueidentity-944f1.firebaseapp.com",
  projectId: "trueidentity-944f1",
  storageBucket: "trueidentity-944f1.appspot.com",
  messagingSenderId: "117279428999",
  appId: "1:117279428999:web:6ac3e91ba4e027515a4322",
  measurementId: "G-VBWGLCH1T4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
