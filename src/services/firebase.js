// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/app";

// // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD81eBkMqdcK7-Tipti-qVN_5D035jLZ5Q",
    authDomain: "budget-tracker-476b8.firebaseapp.com",
    projectId: "budget-tracker-476b8",
    storageBucket: "budget-tracker-476b8.appspot.com",
    messagingSenderId: "607530223022",
    appId: "1:607530223022:web:e83dc7f4aef9c1edb2f43f",
};

// const firebaseConfig = {
//     apiKey: "AIzaSyA9v5nO8zF1bYZetb4PcZNUpmzaKA16YOg",
//     authDomain: "budget-second.firebaseapp.com",
//     projectId: "budget-second",
//     storageBucket: "budget-second.appspot.com",
//     messagingSenderId: "293064886575",
//     appId: "1:293064886575:web:52241fb9c1903c9e09b9da",
// };

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = firebase.firestore();
export default firestore; // exporting a firebase.firestore.Firestore object
