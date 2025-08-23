let searchForm = document.querySelector('.header .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}
function toggleReadMore(event) {
    event.preventDefault(); // Stops page refresh
    let moreText = document.getElementById("more-text");
    let btn = event.target;

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        btn.textContent = "Read Less";
    } else {
        moreText.style.display = "none";
        btn.textContent = "Read More";
    }
}
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: name, price: price, image: image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
    window.location.href = 'cart.html'; // redirect after alert
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const container = document.getElementById('cart-container');
const subtotalSpan = document.getElementById('subtotal');
const deliverySpan = document.getElementById('delivery');
const totalSpan = document.getElementById('total');

const deliveryFee = 2000; // delivery fee in XAF

function renderCart() {
    container.innerHTML = "";
    if(cart.length === 0){
        container.innerHTML = "<p>Your cart is empty</p>";
        subtotalSpan.innerText = "0 XAF";
        totalSpan.innerText = "0 XAF";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        let quantity = item.quantity || 1;
        subtotal += item.price * quantity;

        container.innerHTML += `
            <div class="box">
                <i class="fas fa-times" onclick="removeItem(${index})"></i>
                <img src="${item.image}" alt="${item.name}" width="100">
                <div class="content">
                    <h3>${item.name}</h3>
                  <div class="quantity">
    <span>Quantity:</span> 
    <input type="number" value="${quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
</div>

                    <div class="price">${item.price * quantity} XAF</div>
                </div>
            </div>
        `;
    });

    subtotalSpan.innerText = subtotal + " XAF";
    totalSpan.innerText = (subtotal + deliveryFee) + " XAF";
    deliverySpan.innerText = deliveryFee + " XAF";
}

function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateQuantity(index, qty) {
    qty = parseInt(qty);
    cart[index].quantity = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Initial render
renderCart();
document.getElementById("checkout-btn").addEventListener("click", function(e) {
    e.preventDefault();

    // Fetch cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello! I would like to place an order:\n\n";
    let subtotal = 0;

    cart.forEach(item => {
        // Handle missing values
        let name = item.name || "Unknown Item";
        let price = parseInt(item.price) || 0; // Convert to number
        let quantity = item.quantity || 1;

        message += `${name} - ${price} XAF x ${quantity}\n`;

        subtotal += price * quantity;
    });

    let delivery = 2000;
    let total = subtotal + delivery;

    message += `\nSubtotal: ${subtotal} XAF\nDelivery: ${delivery} XAF\nTotal: ${total} XAF\n\nPlease confirm and provide payment information.`;

    // Encode message for URL
    let encodedMessage = encodeURIComponent(message);
    let phone = "237699324290"; // Replace with your WhatsApp number
    let whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");
});
// common for all pages with search box

