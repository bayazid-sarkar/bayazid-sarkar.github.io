import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

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

document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("Reset link sent! Check your email.", "text-green-500");
    
    // Redirect to login page after 3 seconds
    setTimeout(() => {
      window.location.href = "/VenueVista/pages/login.html";
    }, 3000);
  } catch (error) {
    showMessage(`Error: ${error.message}`, "text-red-500");
  }
});

// Show Message with Smooth Transition
const showMessage = (text, style) => {
  const message = document.getElementById("message");
  message.textContent = text;
  message.className = `text-center mt-4 text-lg font-semibold ${style} hidden`;

  // Trigger reflow to enable transition
  void message.offsetWidth;

  // Apply the fade-in effect
  message.classList.remove("hidden");
  message.classList.add("opacity-100");

  // Automatically hide message after 5 seconds
  setTimeout(() => {
    message.classList.add("hidden");
  }, 5000);
};
