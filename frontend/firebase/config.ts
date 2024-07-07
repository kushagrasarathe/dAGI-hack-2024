// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo4yaDVPw2KFlTGCU8wiOMPZrC8mJ977w",
  authDomain: "agentai-292c0.firebaseapp.com",
  projectId: "agentai-292c0",
  storageBucket: "agentai-292c0.appspot.com",
  messagingSenderId: "323686447541",
  appId: "1:323686447541:web:0d643a179ef52d4e2781fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
