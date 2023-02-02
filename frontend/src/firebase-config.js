import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBpbNDO9eW-1lCOyVvaMMn9t9-g6R6O9Ng",
  authDomain: "trueidentity-944f1.firebaseapp.com",
  projectId: "trueidentity-944f1",
  databaseURL: "https://trueidentity-944f1-default-rtdb.firebaseio.com/",
  storageBucket: "trueidentity-944f1.appspot.com",
  messagingSenderId: "117279428999",
  appId: "1:117279428999:web:6ac3e91ba4e027515a4322",
  measurementId: "G-VBWGLCH1T4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
