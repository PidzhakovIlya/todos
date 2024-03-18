// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvnJ47NNf_k2-2BjKmykla213YbUwCmoo",
    authDomain: "todos-e5a5e.firebaseapp.com",
    projectId: "todos-e5a5e",
    storageBucket: "todos-e5a5e.appspot.com",
    messagingSenderId: "834548626869",
    appId: "1:834548626869:web:81efc4d493eb912c47d5fc",
    databaseURL:"https://todos-e5a5e-default-rtdb.europe-west1.firebasedatabase.app/:null"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp

// Initialize Firebase
const app = initializeApp(firebaseConfig);