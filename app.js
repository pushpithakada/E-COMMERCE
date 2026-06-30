// Scroll to Top Button
const scrollBtn = document.getElementById("scrollBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = document.getElementById("cart-count");

    if (count) {
        count.innerText = cart.length;
    }
}

updateCartCount();

// Load Latest Products
async function loadProducts() {

    const container = document.getElementById("latest-products");

    if (!container) return;

    container.innerHTML = `
    <div class="text-center py-5">
        <div class="loader"></div>
    </div>
    `;

    try {

        const response = await fetch("https://fakestoreapi.com/products?limit=8");

        const products = await response.json();

        container.innerHTML = "";

        products.forEach(product => {

            container.innerHTML += `
            
            <div class="col-lg-3 col-md-6">

                <div class="product-card">

                    <img src="${product.image}" alt="">

                    <div class="product-info">

                        <h5>${product.title}</h5>

                        <div class="rating">

                            ⭐ ${product.rating.rate}

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

    catch (error) {

        container.innerHTML = `

        <div class="col-12 text-center">

            <h3>Unable to load products.</h3>

        </div>

        `;

        console.error(error);

    }

}

loadProducts();

// Add To Cart
async function addToCart(id) {

    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    const product = await response.json();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.id === id);

    if (exists) {

        alert("Product already added to cart.");

        return;

    }

    product.quantity = 1;

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart successfully.");

}

// Search
function searchProducts() {

    const keyword = document.getElementById("searchInput").value;

    window.location.href = `search.html?search=${keyword}`;

}

// Newsletter Subscribe
const subscribeBtn = document.querySelector(".newsletter button");

if (subscribeBtn) {

    subscribeBtn.addEventListener("click", () => {

        const email = document.querySelector(".newsletter input").value;

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing!");

        document.querySelector(".newsletter input").value = "";

    });

}

// Navbar Active Link
const current = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach(link => {

    if (link.getAttribute("href") === current) {

        link.classList.add("active");

    }

});

// Footer Year
const year = new Date().getFullYear();

const footer = document.querySelector("footer p.text-center");

if (footer) {

    footer.innerHTML = `© ${year} ShopEase. All Rights Reserved.`;

}