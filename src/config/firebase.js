import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY || "AIzaSyDLSujgSs6prspafdtCJHyrsgXOk4RjWjc",
  authDomain: "test-project-e4947.firebaseapp.com",
  projectId: "test-project-e4947",
  storageBucket: "test-project-e4947.appspot.com",
  messagingSenderId: "431969069814",
  appId: "1:431969069814:web:52d0dcbc7c7bcb561e9ad7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
