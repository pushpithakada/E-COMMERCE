// ================================
// ShopEase Products Page
// Part 1
// ================================

let allProducts = [];
let filteredProducts = [];

const container = document.getElementById("productsContainer");
const priceValue = document.getElementById("priceValue");

// Load Products
async function loadProducts() {

    try {

        container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="loader"></div>
        </div>`;

        const response = await fetch("https://fakestoreapi.com/products");

        allProducts = await response.json();

        filteredProducts = [...allProducts];

        displayProducts(filteredProducts);

    }

    catch (error) {

        console.log(error);

        container.innerHTML = `
        <div class="col-12 text-center">
            <h3>Unable to load products.</h3>
        </div>`;
    }

}

// Display Products

function displayProducts(products) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
        <div class="col-12 text-center">
            <h3>No Products Found</h3>
        </div>`;

        return;

    }

    products.forEach(product => {

        container.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="product-card">

                <img src="${product.image}" alt="">

                <div class="product-info">

                    <h5>${product.title}</h5>

                    <div class="rating">

                        ⭐ ${product.rating.rate}
                        (${product.rating.count})

                    </div>

                    <h4 class="price">

                        $${product.price}

                    </h4>

                    <div class="d-grid gap-2 mt-3">

                        <button
                            class="btn btn-warning"
                            onclick="addToCart(${product.id})">

                            Add To Cart

                        </button>

                        <a
                            href="product.html?id=${product.id}"
                            class="btn btn-dark">

                            View Details

                        </a>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}

// Price Range

const priceRange = document.getElementById("priceRange");

priceRange.addEventListener("input", () => {

    priceValue.innerText = priceRange.value;

});

// Initial Load

loadProducts();
// ================================
// Part 2
// Search & Filters
// ================================

// Search

function searchProducts() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(keyword)
    );

    applyCategoryPriceFilters();

}

// Category + Price

function applyCategoryPriceFilters() {

    const category =
        document.getElementById("categoryFilter").value;

    const maxPrice =
        Number(document.getElementById("priceRange").value);

    filteredProducts = allProducts.filter(product => {

        const categoryMatch =
            category === "all" ||
            product.category === category;

        const priceMatch =
            product.price <= maxPrice;

        const searchKeyword =
            document
                .getElementById("searchInput")
                .value
                .toLowerCase();

        const searchMatch =
            product.title
                .toLowerCase()
                .includes(searchKeyword);

        return categoryMatch &&
               priceMatch &&
               searchMatch;

    });

    sortProducts();

}

// Apply Button

document
    .getElementById("applyFilters")
    .addEventListener("click", applyCategoryPriceFilters);

// Live Search

document
    .getElementById("searchInput")
    .addEventListener("keyup", searchProducts);

// Live Category

document
    .getElementById("categoryFilter")
    .addEventListener("change", applyCategoryPriceFilters);

// Live Price

priceRange.addEventListener("change", () => {

    priceValue.innerText = priceRange.value;

    applyCategoryPriceFilters();

});
// ================================
// Part 3
// Sorting & Cart
// ================================

function sortProducts() {

    const sort =
        document.getElementById("sortProducts").value;

    if (sort === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    }

    else if (sort === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    }

    else if (sort === "name") {

        filteredProducts.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    }

    displayProducts(filteredProducts);

}

document
    .getElementById("sortProducts")
    .addEventListener("change", sortProducts);

// ================================
// Add To Cart
// ================================

async function addToCart(id) {

    const response =
        await fetch(`https://fakestoreapi.com/products/${id}`);

    const product =
        await response.json();

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const exists =
        cart.find(item => item.id === id);

    if (exists) {

        alert("Product already exists in cart.");

        return;

    }

    product.quantity = 1;

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Added Successfully!");

}

// ================================
// Cart Count
// ================================

function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const badge =
        document.getElementById("cart-count");

    if (badge) {

        badge.innerText = cart.length;

    }

}

updateCartCount();

// ================================
// Scroll Button
// ================================

const scrollBtn =
    document.getElementById("scrollBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollBtn.style.display = "block";

    }

    else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});