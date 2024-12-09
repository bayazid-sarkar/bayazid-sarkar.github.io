document.addEventListener("DOMContentLoaded", function () {
    // Retrieve venue details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const venueName = urlParams.get("name");
    const venueImage = urlParams.get("photo");
    const venueLocation = urlParams.get("location");
    const venueRate = parseInt(urlParams.get("rate")) || 0;
    const venueRatings = urlParams.get("ratings");
  
    // Populate venue details
    document.getElementById("venueName").innerText = venueName;
    document.getElementById("venueImage").src = venueImage;
    document.getElementById("venueLocation").innerText = `Location: ${venueLocation}`;
    document.getElementById("venueRate").innerText = `Price: BDT ${venueRate} Per Slot`;
    document.getElementById("venueRatings").innerText = `Ratings: ${venueRatings} ⭐`;
  
    // Time slots
    const slots = [
      "8:00 AM - 9:30 AM",
      "9:40 AM - 11:10 AM",
      "11:20 AM - 12:50 PM",
      "1:00 PM - 2:30 PM",
      "2:40 PM - 4:10 PM",
      "4:20 PM - 5:50 PM",
      "6:00 PM - 7:30 PM",
      "7:40 PM - 9:10 PM",
    ];
  
    const slotContainer = document.getElementById("slotContainer");
    slotContainer.innerHTML = ""; // Clear any existing slots
  
    slots.forEach((time, index) => {
      const slotButton = document.createElement("button");
      slotButton.classList.add("slot", "bg-gray-200", "hover:bg-gray-400", "p-2", "m-1", "rounded");
      slotButton.innerText = time;
      slotButton.dataset.slotId = index + 1;
  
      slotButton.addEventListener("click", () => {
        slotButton.classList.toggle("bg-green-500");
        slotButton.classList.toggle("text-white");
        slotButton.classList.toggle("selected");
        updateOrderSummary();
      });
  
      slotContainer.appendChild(slotButton);
    });
  
    // Merchandise
    const providedMerchandise = [
      { name: "T-shirt", image: "tshirt.jpg" },
      { name: "Sports Shoes", image: "shoes.jpg" },
      { name: "Water Bottle", image: "bottle.jpg" },
    ];
  
    const providedMerchandiseSection = document.getElementById("providedMerchandise");
    providedMerchandiseSection.innerHTML = "";
  
    providedMerchandise.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("merchandise-card", "bg-gray-100", "shadow", "p-4", "m-2", "rounded");
  
      card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 mx-auto">
      <p class="text-center mt-2">${item.name}</p>
      `;
  
      providedMerchandiseSection.appendChild(card);
    });
  
    // Update order summary
    function updateOrderSummary() {
      const selectedSlots = Array.from(document.querySelectorAll(".slot.selected"));
      const totalAmount = selectedSlots.length * venueRate;
  
      document.getElementById("selectedSlotsText").innerText = `Selected Time Slots: ${
        selectedSlots.map((slot) => slot.innerText).join(", ") || "None"
      }`;
      document.getElementById("totalAmount").innerText = `Total: BDT ${totalAmount}/=`;
      document.getElementById("continueButton").disabled = selectedSlots.length === 0;
    }
  
    // Payment Popup Handling
    const paymentPopup = document.getElementById("paymentPopup");
    const continueButton = document.getElementById("continueButton");
    const cancelPaymentButton = document.getElementById("cancelPaymentButton");
    let popupOpen = false;
  
    paymentPopup.style.display = "none";
  
    continueButton.addEventListener("click", () => {
      const selectedSlots = Array.from(document.querySelectorAll(".slot.selected"));
      if (selectedSlots.length > 0) {
        paymentPopup.style.display = "flex";
        popupOpen = true;
      } else {
        alert("Please select at least one slot before proceeding to payment.");
      }
    });
  
    cancelPaymentButton.addEventListener("click", () => {
      paymentPopup.style.display = "none";
      popupOpen = false;
    });
  
    // Close popup when clicking outside
    document.addEventListener("click", (event) => {
      if (
        popupOpen &&
        paymentPopup.style.display === "flex" &&
        !event.target.closest(".popup-content") &&
        !event.target.closest("#continueButton")
      ) {
        paymentPopup.style.display = "none";
        popupOpen = false;
      }
    });
  
    // Handle OTP Logic
    const sendOtpButton = document.getElementById("sendOtpButton");
    const verifyOtpButton = document.getElementById("verifyOtpButton");
    const otpInputContainer = document.getElementById("otpInputContainer");
    const paymentOptions = document.getElementById("paymentOptions");
    let hardcodedOtp = "1234";
  
    sendOtpButton.addEventListener("click", () => {
      otpInputContainer.classList.remove("hidden");
      alert("Enter OTP 1234 to verify.");
    });
  
    verifyOtpButton.addEventListener("click", () => {
      const userEnteredOtp = document.getElementById("otp").value;
      if (userEnteredOtp === hardcodedOtp) {
        alert("OTP verified successfully!");
        otpInputContainer.classList.add("hidden");
        paymentOptions.classList.remove("hidden");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    });
  
    // Handle payment on clicking confirm
    const bkashButton = document.getElementById("bkashButton");
    const nagadButton = document.getElementById("nagadButton");
  
    bkashButton.addEventListener("click", () => {
      alert("Processing bKash payment...");
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 1500);
    });
  
    nagadButton.addEventListener("click", () => {
      alert("Processing Nagad payment...");
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 1500);
    });
});
