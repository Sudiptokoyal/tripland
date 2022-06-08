import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./configs/firebase.config";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, addDoc, collection, query, getDocs, where, signOut };