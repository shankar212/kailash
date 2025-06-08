// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdqsYZsIVfuVsFsMH9Y0B66esS3M6P3gI",
  authDomain: "stum-4a33d.firebaseapp.com",
  projectId: "stum-4a33d",
  storageBucket: "stum-4a33d.firebasestorage.app",
  messagingSenderId: "921632558719",
  appId: "1:921632558719:web:f691d15886a8c64b2df94a",
  measurementId: "G-E4HEGRXV25",
};

// Initialize Firebase app only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics only if supported (browser environment)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
