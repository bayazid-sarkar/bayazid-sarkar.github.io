import { auth, db } from "./firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
    const user = auth.currentUser;

    if (!user) {
        alert("You are not logged in.");
        window.location.href = "login.html";
        return;
    }

    // Display user info
    document.getElementById("userName").innerText = `Name: ${user.displayName || "Anonymous"}`;
    document.getElementById("userEmail").innerText = `Email: ${user.email}`;

    // Fetch bookings
    const bookingsRef = db.collection("bookings").where("userId", "==", user.uid);
    const bookingList = document.getElementById("bookingList");

    try {
        const snapshot = await bookingsRef.get();
        if (snapshot.empty) {
            bookingList.innerText = "No bookings found.";
        } else {
            snapshot.forEach((doc) => {
                const booking = doc.data();
                const bookingItem = document.createElement("div");
                bookingItem.innerText = `
                    Venue: ${booking.venueName},
                    Slots: ${booking.selectedSlots.join(", ")},
                    Total: $${booking.totalAmount}
                `;
                bookingList.appendChild(bookingItem);
            });
        }
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
});
