
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAJXXvLiYX_FqSHzcHq_CzXG4_bOTRvoPU",
  authDomain: "producthunt-e1.firebaseapp.com",
  projectId: "producthunt-e1",
  storageBucket: "producthunt-e1.appspot.com",
  messagingSenderId: "656391578521",
  appId: "1:656391578521:web:5c92e120f85fe8c77d6908"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);