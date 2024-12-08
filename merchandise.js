function loadHTML() {
    fetch('../public/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    fetch('../public/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML();

    const products = [
        { name: "Cricket Jersey", price: 20, img: "../src/img/jersey.jpg" },
        { name: "Football Boots", price: 50, img: "../src/img/boots.jpg" },
        { name: "Cap", price: 10, img: "../src/img/cap.jpg" },
        { name: "Team Flag", price: 15, img: "../src/img/flag.jpg" }
    ];

    const productContainer = document.getElementById('products');

    products.forEach(product => {
        const productCard = `
            <div class="border p-4 rounded">
                <img src="${product.img}" alt="${product.name}" class="w-full h-40 object-cover rounded" />
                <h2 class="text-lg font-bold mt-4">${product.name}</h2>
                <p class="text-green-500">$${product.price}</p>
                <button class="bg-green-500 text-white px-4 py-2 mt-2 rounded order-btn" data-name="${product.name}">Order Now</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-btn')) {
            const productName = e.target.getAttribute('data-name');
            alert(`You have ordered: ${productName}`);
        }
    });
});
