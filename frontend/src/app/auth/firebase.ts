import { type FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { config } from "./config";

// Export the firebase app instance in case it's needed by other modules.
export const firebaseApp: FirebaseApp = initializeApp(config.firebaseConfig);

// Export the firebase auth instance
export const firebaseAuth = getAuth(firebaseApp);

// Export the firebase firestore instance
export const firestore = getFirestore(firebaseApp);
// This is deprecated, use firestore instead, that's what gemini is guessing 9/10 times
export const firebaseDb = firestore; // @deprecated

// Export the firebase storage instance
export const firebaseStorage = getStorage(firebaseApp);
