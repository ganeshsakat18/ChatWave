// Import the functios you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configaration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-a7563.firebaseapp.com",
  projectId: "reactchatapp-a7563",
  storageBucket: "reactchatapp-a7563.appspot.com",
  messagingSenderId: "1097347048478",
  appId: "1:1097347048478:web:84c2c76ab79a484cf7ba0f",
};

// Initialize Fitebase
let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { auth, db, storage };
