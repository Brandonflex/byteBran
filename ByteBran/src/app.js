// Product Data
const products = [
    {
        id: 1,
        name: "Pro Competition Basketball",
        price: 89.99,
        category: "balls",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80",
        description: "Official size and weight, premium composite leather"
    },
    {
        id: 2,
        name: "Elite Performance Shoes",
        price: 129.99,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Superior grip and ankle support"
    },
    {
        id: 3,
        name: "Training Basketball",
        price: 49.99,
        category: "balls",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80",
        description: "Durable rubber construction, ideal for practice"
    },
    {
        id: 4,
        name: "Professional Knee Pads",
        price: 34.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        description: "Maximum protection and comfort"
    }
];

// Slider Images
const sliderImages = [
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=80"
];

// Cart State
let cart = [];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');
const filterBtns = document.querySelectorAll('.filter-btn');
const productGrid = document.querySelector('.shop-grid');
const featuredGrid = document.querySelector('.featured-products .product-grid');
const cartBtn = document.querySelector('.cart-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const bookingForm = document.getElementById('booking-form');

// Navigation
function navigateTo(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    window.scrollTo(0, 0);
}

// Initialize Products
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="btn primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

function initializeProducts() {
    // Featured Products (first 3)
    const featuredProducts = products.slice(0, 3);
    featuredGrid.innerHTML = featuredProducts.map(createProductCard).join('');

    // All Products
    filterProducts('all');
}

// Product Filtering
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
    }
}

function updateCartCount() {
    cartBtn.textContent = `Cart (${cart.length})`;
}

// Form Validation
function validateBookingForm(e) {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const duration = document.getElementById('duration').value;

    if (!date || !time || !duration) {
        alert('Please fill in all fields');
        return;
    }

    alert('Booking submitted successfully! We will contact you shortly.');
    e.target.reset();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize products
    initializeProducts();

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            navigateTo(sectionId);
        });
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
        });
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Booking form
    bookingForm.addEventListener('submit', validateBookingForm);

    // Initialize with home section
    navigateTo('home');
});