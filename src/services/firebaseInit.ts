import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseConfig);
const fbAuth = firebaseApp.auth();
const fStore = firebaseApp.firestore();
export { firebaseApp, fbAuth, fStore };
