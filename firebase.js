// firebase.js
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDTmdttPtfhIdDB5Hqdl7GRgAdk6I6dRAI",
  authDomain: "venuevista-12.firebaseapp.com",
  databaseURL: "https://venuevista-12-default-rtdb.firebaseio.com",
  projectId: "venuevista-12",
  storageBucket: "venuevista-12.appspot.com",
  messagingSenderId: "462965670870",
  appId: "1:462965670870:web:d83876a8fd6b98fd76da77"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

module.exports = { auth, db };
