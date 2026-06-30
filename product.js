// ===========================================
// product.js - Part 1
// Load Product Details
// ===========================================

// Get Product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// DOM Elements
const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productCategory = document.getElementById("productCategory");
const productRating = document.getElementById("productRating");
const quantityInput = document.getElementById("quantity");

let currentProduct = null;

// Load Product
async function loadProduct() {

    if (!productId) {
        alert("Invalid Product");
        window.location.href = "products.html";
        return;
    }

    try {

        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        currentProduct = await response.json();

        displayProduct(currentProduct);

        loadRelatedProducts(currentProduct.category);

    }

    catch (error) {

        console.log(error);

        document.querySelector(".container").innerHTML = `
            <h2 class="text-center text-danger">
                Unable to load product.
            </h2>
        `;
    }

}

// Display Product
function displayProduct(product) {

    productImage.src = product.image;

    productTitle.innerText = product.title;

    productPrice.innerText = "$" + product.price;

    productDescription.innerText = product.description;

    productCategory.innerText = product.category;

    productRating.innerHTML =
        `⭐ ${product.rating.rate} (${product.rating.count} Reviews)`;

}

loadProduct();
// ===========================================
// product.js - Part 2
// Related Products + Add to Cart
// ===========================================

// Load Related Products
async function loadRelatedProducts(category) {

    try {

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const products = await response.json();

        const related = products
            .filter(p =>
                p.category === category &&
                p.id != productId
            )
            .slice(0, 4);

        const container =
            document.getElementById("relatedProducts");

        container.innerHTML = "";

        related.forEach(product => {

            container.innerHTML += `

            <div class="col-lg-3 col-md-6 mb-4">

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

                        <a
                        href="product.html?id=${product.id}"
                        class="btn btn-warning w-100">

                        View Product

                        </a>

                    </div>

                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

// ===========================================
// Add To Cart
// ===========================================

document
.getElementById("addCartBtn")
.addEventListener("click", addToCart);

function addToCart(){

    if(!currentProduct) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const quantity =
    parseInt(quantityInput.value);

    const existing =
    cart.find(item=>item.id==currentProduct.id);

    if(existing){

        existing.quantity += quantity;

    }

    else{

        cart.push({

            ...currentProduct,

            quantity: quantity

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    alert("Product added to cart successfully!");

}

// ===========================================
// Update Cart Count
// ===========================================

function updateCartCount(){

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const badge =
    document.getElementById("cart-count");

    if(badge){

        let total = 0;

        cart.forEach(item=>{

            total += item.quantity;

        });

        badge.innerText = total;

    }

}

updateCartCount();

// ===========================================
// Scroll To Top
// ===========================================

const scrollBtn =
document.getElementById("scrollBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        scrollBtn.style.display="block";

    }

    else{

        scrollBtn.style.display="none";

    }

});

scrollBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});