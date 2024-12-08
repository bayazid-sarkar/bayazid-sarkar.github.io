
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTmdttPtfhIdDB5Hqdl7GRgAdk6I6dRAI",
    authDomain: "venuevista-12.firebaseapp.com",
    databaseURL: "https://venuevista-12-default-rtdb.firebaseio.com",
    projectId: "venuevista-12",
    storageBucket: "venuevista-12.appspot.com",
    messagingSenderId: "462965670870",
    appId: "1:462965670870:web:d83876a8fd6b98fd76da77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
