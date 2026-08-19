import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "researchforge-564fe.firebaseapp.com",
  projectId: "researchforge-564fe",
  storageBucket: "researchforge-564fe.firebasestorage.app",
  messagingSenderId: "104166424570",
  appId: "1:104166424570:web:8ae846185993e7de23ee43",
  measurementId: "G-NWRM9M50RZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
