import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTmdttPtfhIdDB5Hqdl7GRgAdk6I6dRAI",
  authDomain: "venuevista-12.firebaseapp.com",
  databaseURL: "https://venuevista-12-default-rtdb.firebaseio.com",
  projectId: "venuevista-12",
  storageBucket: "venuevista-12.appspot.com",
  messagingSenderId: "462965670870",
  appId: "1:462965670870:web:d83876a8fd6b98fd76da77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Load Navbar and Footer
const loadComponent = async (id, file) => {
  try {
    const response = await fetch(`/VenueVista/public/${file}`);
    if (response.ok) {
      document.getElementById(id).innerHTML = await response.text();
    } else {
      console.error(`Failed to load ${file}:`, response.status);
    }
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
};

loadComponent('navbar', 'navbar.html');
loadComponent('footer', 'footer.html');

// Registration Form Submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    showMessage("Registration successful!", "text-green-500");
    
    // Redirect to login page after successful registration
    setTimeout(() => {
      window.location.href = '/VenueVista/pages/login.html';
    }, 2000);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email already registered!", "text-red-500");
    } else {
      showMessage(`Error: ${error.message}`, "text-red-500");
    }
  }
});

// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    showMessage(`Welcome, ${user.displayName}!`, "text-green-500");
    
    // Redirect to profile page after successful Google sign-in
    setTimeout(() => {
      window.location.href = '/VenueVista/pages/profile.html';
    }, 2000);
  } catch (error) {
    showMessage(`Error: ${error.message}`, "text-red-500");
  }
});

// Show Message with Smooth Transition
const showMessage = (text, style) => {
  const message = document.getElementById("message");
  message.textContent = text;
  message.className = `text-center mt-4 text-lg font-semibold ${style} opacity-0 transition-all duration-500`;

  // Trigger reflow to enable transition
  void message.offsetWidth;

  // Apply the fade-in effect
  message.classList.remove("hidden", "opacity-0");
  message.classList.add("opacity-100");

  // Automatically hide message after 3 seconds
  setTimeout(() => {
    message.classList.add("opacity-0");
    setTimeout(() => message.classList.add("hidden"), 500);
  }, 3000);
};
