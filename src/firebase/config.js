import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyA8h3MxLTsa5AqHCGkotjzdI85v2u3a4",
  authDomain: "researchwell-eb68e.firebaseapp.com",
  projectId: "researchwell-eb68e",
  storageBucket: "researchwell-eb68e.firebasestorage.app",
  messagingSenderId: "947775818600",
  appId: "1:947775818600:web:30586b7d7b40162d6924dd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
