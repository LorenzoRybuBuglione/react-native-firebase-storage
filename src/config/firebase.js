import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env"

const firebaseConfig = {
  apiKey: 'AIzaSyC6Yy8xQhacOEhWdcLKMn_4VYScuMIRcos',
  authDomain: 'spaceapp-7384d.firebaseapp.com',
  projectId: 'spaceapp-7384d',
  storageBucket: 'spaceapp-7384d.appspot.com',
  messagingSenderId: '386413762443',
  appId: '1:386413762443:web:5df9502686fefc466f818e'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage };