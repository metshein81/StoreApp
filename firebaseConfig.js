import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPj06QETPSFqXMJfc6tim1miTfJRZsKVk",
  authDomain: "KM-0111.firebaseapp.com",
  projectId: "KM-0111",
  storageBucket: "KM-0111.appspot.com",
  messagingSenderId: "1096775195034",
  appId: "1:1096775195034:android:6d226af581cbe2e61f4223"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
