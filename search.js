// ======================================
// search.js
// ShopEase Search Page
// ======================================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

let products = [];

// Load Products
async function loadProducts() {

    try {

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        products = await response.json();

        // Search automatically if URL contains ?search=
        const params = new URLSearchParams(window.location.search);

        const keyword = params.get("search");

        if (keyword) {

            searchInput.value = keyword;

            searchProduct();

        }

    }

    catch (error) {

        console.log(error);

        searchResults.innerHTML = `

        <div class="col-12 text-center">

            <h3>Unable to load products.</h3>

        </div>

        `;

    }

}

// Search Products

function searchProduct() {

    const keyword = searchInput.value.trim().toLowerCase();

    searchResults.innerHTML = "";

    if (keyword === "") {

        searchResults.innerHTML = `

        <div class="col-12 text-center">

            <h4>Enter a product name to search.</h4>

        </div>

        `;

        return;

    }

    const filtered = products.filter(product =>

        product.title.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    if (filtered.length === 0) {

        searchResults.innerHTML = `

        <div class="col-12 text-center">

            <h3>No Products Found</h3>

        </div>

        `;

        return;

    }

    filtered.forEach(product => {

        searchResults.innerHTML += `

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

// Add To Cart

async function addToCart(id) {

    const response = await fetch(

        `https://fakestoreapi.com/products/${id}`

    );

    const product = await response.json();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.id === id);

    if (exists) {

        exists.quantity += 1;

    }

    else {

        product.quantity = 1;

        cart.push(product);

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    alert("Product added to cart!");

}

// Button Click

searchBtn.addEventListener(

    "click",

    searchProduct

);

// Enter Key

searchInput.addEventListener(

    "keyup",

    function(event){

        if(event.key==="Enter"){

            searchProduct();

        }

    }

);

// Scroll To Top

const scrollBtn = document.getElementById("scrollBtn");

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

// Load Products

loadProducts();