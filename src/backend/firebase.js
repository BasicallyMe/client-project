
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCT6Ba18kRd-XTpI7ehQvLAFUj-M2ovkDo",
  authDomain: "client-project-2b177.firebaseapp.com",
  projectId: "client-project-2b177",
  storageBucket: "client-project-2b177.appspot.com",
  messagingSenderId: "805912864552",
  appId: "1:805912864552:web:215e256206d74e025b521d",
  measurementId: "G-X27SRP3XQP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);