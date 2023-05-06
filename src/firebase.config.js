import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAduYhN2UoLsgflLnL8D1wZvZfCXJs52wQ",
  authDomain: "foodbase-56502.firebaseapp.com",
  databaseURL: "https://foodbase-56502-default-rtdb.firebaseio.com",
  projectId: "foodbase-56502",
  storageBucket: "foodbase-56502.appspot.com",
  messagingSenderId: "440236786047",
  appId: "1:440236786047:web:f5349e673c87fed9401a4a"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };