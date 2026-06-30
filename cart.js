// =======================================
// cart.js - Part 1
// Load & Display Cart
// =======================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const subtotal = document.getElementById("subtotal");
const grandTotal = document.getElementById("grandTotal");

function displayCart() {

    if (cart.length === 0) {

        cartContainer.innerHTML = `

        <div class="text-center py-5">

            <h2>Your Cart is Empty</h2>

            <a href="products.html"
               class="btn btn-warning mt-3">

                Shop Now

            </a>

        </div>

        `;

        totalItems.innerText = 0;
        subtotal.innerText = "$0";
        grandTotal.innerText = "$0";

        updateCartCount();

        return;

    }

    cartContainer.innerHTML = "";

    let total = 0;
    let items = 0;

    cart.forEach((product, index) => {

        const amount = product.price * product.quantity;

        total += amount;

        items += product.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div class="row align-items-center">

                <div class="col-md-3">

                    <img
                        src="${product.image}"
                        class="img-fluid">

                </div>

                <div class="col-md-4">

                    <h5>${product.title}</h5>

                    <h4 class="price">

                        $${product.price}

                    </h4>

                </div>

                <div class="col-md-2">

                    <input
                        type="number"
                        min="1"
                        value="${product.quantity}"
                        class="form-control"
                        onchange="changeQuantity(${index}, this.value)">

                </div>

                <div class="col-md-2">

                    <strong>

                        $${amount.toFixed(2)}

                    </strong>

                </div>

                <div class="col-md-1">

                    <button
                        class="btn btn-danger"

                        onclick="removeItem(${index})">

                        <i class="fa fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    totalItems.innerText = items;

    subtotal.innerText = "$" + total.toFixed(2);

    grandTotal.innerText = "$" + total.toFixed(2);

    updateCartCount();

}

displayCart();
// =======================================
// cart.js - Part 2
// Quantity, Remove, Clear Cart
// =======================================

// Change Quantity
function changeQuantity(index, quantity) {

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }

    cart[index].quantity = quantity;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

// Remove Item
function removeItem(index) {

    if (confirm("Remove this product from cart?")) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

}

// Clear Entire Cart
function clearCart() {

    if (confirm("Are you sure you want to clear your cart?")) {

        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

}

// Update Cart Badge
function updateCartCount() {

    const badge = document.getElementById("cart-count");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    badge.innerText = total;

}

// Scroll To Top Button
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

updateCartCount();