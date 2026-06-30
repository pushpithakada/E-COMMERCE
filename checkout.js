// ===============================
// checkout.js
// ===============================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");
const totalItems = document.getElementById("totalItems");
const subtotal = document.getElementById("subtotal");
const grandTotal = document.getElementById("grandTotal");

function loadOrderSummary() {

    if (cart.length === 0) {

        orderItems.innerHTML = `
            <div class="alert alert-warning">
                Your cart is empty.
            </div>
        `;

        totalItems.innerText = "0";
        subtotal.innerText = "$0.00";
        grandTotal.innerText = "$0.00";

        return;
    }

    orderItems.innerHTML = "";

    let total = 0;
    let items = 0;

    cart.forEach(product => {

        const quantity = product.quantity || 1;
        const amount = product.price * quantity;

        items += quantity;
        total += amount;

        orderItems.innerHTML += `

        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">

            <div>

                <strong>${product.title}</strong>

                <br>

                Qty : ${quantity}

            </div>

            <div>

                $${amount.toFixed(2)}

            </div>

        </div>

        `;

    });

    totalItems.innerText = items;

    subtotal.innerText = "$" + total.toFixed(2);

    grandTotal.innerText = "$" + total.toFixed(2);

}

loadOrderSummary();

// ===============================
// Checkout Form
// ===============================

document.getElementById("checkoutForm").addEventListener("submit", function(e){

    e.preventDefault();

    const order = {

        orderNumber: "ORD" + Date.now(),

        customer: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        city: document.getElementById("city").value,

        pincode: document.getElementById("pincode").value,

        products: cart,

        total: grandTotal.innerText,

        status: "Confirmed"

    };

    localStorage.setItem("latestOrder", JSON.stringify(order));

    localStorage.removeItem("cart");

    alert("Order Placed Successfully!");

    window.location.href = "order-success.html";

});