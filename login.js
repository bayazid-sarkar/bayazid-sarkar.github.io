import { auth } from "./firebase.js";

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Login successful!");
        window.location.href = "booking.html"; // Redirect to booking page
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
