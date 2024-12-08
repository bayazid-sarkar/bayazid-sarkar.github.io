// Sample venue data
const venues = [
    {
        name: "Jaaf",
        photo: "jaaf.jpg",
        location: "Uttara",
        id: 1,
        rate: 1600,
        ratings: 4.5,
        map: "https://maps.app.goo.gl/VQdmxLFQFfj2pRGP7",
    },
    {
        name: "Players Arena",
        photo: "playersArena.jpg",
        location: "Wari",
        id: 2,
        rate: 1800,
        ratings: 4,
        map: "https://maps.app.goo.gl/VQdmxLFQFfj2pRGP7",
    },
    {
        name: "Dhaka Arena",
        photo: "dhaka.jpg",
        location: "Farmgate",
        id: 3,
        rate: 2000,
        ratings: 4.5,
        map: "https://maps.app.goo.gl/VQdmxLFQFfj2pRGP7",
    },
    {
        name: "Metroplex Sporting Complex",
        photo: "metroplex.jpg",
        location: "Jatrabari",
        id: 4,
        rate: 1500,
        ratings: 4.5,
        map: "https://maps.app.goo.gl/VQdmxLFQFfj2pRGP7",
    },
    {
        name: "Sports Grill",
        photo: "sportsgril.jpg",
        location: "Mirpur",
        id: 5,
        rate: 1600,
        ratings: 4.5,
        map: "https://maps.app.goo.gl/VQdmxLFQFfj2pRGP7",
    },
    {
        name: "The Stadium",
        photo: "thestadium.jpg",
        location: "Wari",
        id: 6,
        rate: 1600,
        ratings: 4.5,
        map: "https://maps.app.goo.gl/VQdmxLFQFfj2pRGP7",
    },
];

// Pagination state
let currentPage = 0;
const itemsPerPage = 3; // Number of venues to show at a time

// Function to generate venue cards dynamically
function generateVenueCards(filteredVenues) {
    const cardContainer = document.getElementById("cardContainer");

    // Clear any existing content
    cardContainer.innerHTML = "";

    // Calculate start and end indices based on current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredVenues.length);

    // Loop through the filtered venues for the current page
    for (let i = startIndex; i < endIndex; i++) {
        const venue = filteredVenues[i];
        const card = document.createElement("div");
        card.classList.add("venue-card", "p-4", "border", "rounded-lg", "shadow-lg");

        card.innerHTML = `
            <img src="${venue.photo}" alt="${venue.name}" class="venue-image">
            <h3 class="venue-name text-xl font-bold mt-2">${venue.name}</h3>
            <button text-white p-2 rounded-md mt-3"">
            <a href="${venue.map}" class="venue-location">${venue.location}</a>
            </button>
            <p class="venue-rate text-md text-gray-600">Per slot price: BDT ${venue.rate}</p>
            <p class="venue-ratings text-md text-gray-600">Ratings: ${venue.ratings} ⭐</p>
            <button text-white p-2 rounded-md mt-3" onclick="bookVenue(${venue.id})">
                Book Venue
            </button>
        `;

        cardContainer.appendChild(card);
    }

    // If no venues match the search, show a message
    if (filteredVenues.length === 0) {
        cardContainer.innerHTML = "<p>No venues found. Try a different search.</p>";
    }
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const locationSelect = document.getElementById("locationSelect").value.toLowerCase();

    // Filter venues based on search and location
    const filteredVenues = venues.filter(venue => {
        const matchesSearch = venue.name.toLowerCase().includes(searchInput);
        const matchesLocation = locationSelect === "" || venue.location.toLowerCase() === locationSelect;
        return matchesSearch && matchesLocation;
    });

    // Generate cards for the filtered venues
    generateVenueCards(filteredVenues);
}

// Function to handle pagination
function nextPage() {
    if ((currentPage + 1) * itemsPerPage < venues.length) {
        currentPage++;
        generateVenueCards(venues); // Pass the full venue list (or filtered list)
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        generateVenueCards(venues); // Pass the full venue list (or filtered list)
    }
}

// Function to handle venue booking
// Function to handle venue booking
function bookVenue(venueId) {
    // Find the venue data using the venueId
    const venue = venues.find(venue => venue.id === venueId);

    // Create a URL with query parameters for the booking page
    const bookingUrl = new URL('booking.html', window.location.origin);
    bookingUrl.searchParams.append('name', venue.name);
    bookingUrl.searchParams.append('photo', venue.photo);
    bookingUrl.searchParams.append('location', venue.location);
    bookingUrl.searchParams.append('rate', venue.rate);
    bookingUrl.searchParams.append('ratings', venue.ratings);
    bookingUrl.searchParams.append('map', venue.map);

    // Redirect the user to the booking page
    window.location.href = bookingUrl.toString();
}


// Event listeners for search and pagination buttons
document.getElementById("searchInput").addEventListener("input", handleSearch);
document.getElementById("locationSelect").addEventListener("change", handleSearch);

// Initialize venue cards on page load
document.addEventListener("DOMContentLoaded", () => {
    generateVenueCards(venues); // Display all venues by default
    document.getElementById("nextButton").addEventListener("click", nextPage);
    document.getElementById("prevButton").addEventListener("click", prevPage);
});
