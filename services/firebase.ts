import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  projectId: "naija-trivia",
  appId: "1:675073319648:web:15d698b9fe41e039c8e685",
  storageBucket: "naija-trivia.firebasestorage.app",
  apiKey: "AIzaSyD-YOjX9eJSZpcMqNMi2m05-mM8Dy9d_GE",
  authDomain: "naija-trivia.firebaseapp.com",
  messagingSenderId: "675073319648",
  measurementId: "G-VHB899GEJX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const remoteConfig = getRemoteConfig(app);
export default app;
