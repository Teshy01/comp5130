// Import Firestore functions
import { getFirestore } from "firebase/firestore";
import app from "./firebase";

// Initialize Firestore with the Firebase app
const db = getFirestore(app);

export default db;
