// =======================================
// contact.js
// ShopEase Contact Form
// =======================================

// Scroll To Top
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

// Contact Form
const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill all fields.");

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Thank you! Your message has been sent successfully.");

        form.reset();

    });

}

// jQuery Validation
$(document).ready(function () {

    $("#contactForm").on("submit", function (e) {

        const email =
            $("#email").val().trim();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            e.preventDefault();

            alert("Invalid email format.");

            return false;

        }

        return true;

    });

});

// Highlight Active Navigation
const currentPage =
    window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach(link => {

    if (link.getAttribute("href") === currentPage) {

        link.classList.add("active");

    }

});

// Footer Year
const footer =
    document.querySelector("footer .text-center");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} ShopEase. All Rights Reserved.`;

}