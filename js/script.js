/* =========================
   BREW & BEAN
   INTERACTIVE JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 700);
    });


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-open");

        menuToggle.textContent =
            navLinks.classList.contains("mobile-open") ? "✕" : "☰";
    });


    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");
            menuToggle.textContent = "☰";

        });

    });


    /* =========================
       MENU FILTER
    ========================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            menuCards.forEach(card => {

                const category = card.dataset.category;

                if (filter === "all" || category === filter) {

                    card.style.display = "block";

                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";

                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);

                }

            });

        });

    });


    /* =========================
       SHOPPING CART
    ========================= */

    const cart = document.querySelector(".cart");
    const cartOverlay = document.querySelector(".cart-overlay");
    const closeCart = document.querySelector(".close-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total strong");

    let cartItems = [];


    function openCart() {

        cart.classList.add("open");
        cartOverlay.classList.add("active");

    }


    function closeCartFunction() {

        cart.classList.remove("open");
        cartOverlay.classList.remove("active");

    }


    closeCart.addEventListener("click", closeCartFunction);

    cartOverlay.addEventListener("click", closeCartFunction);


    /* =========================
       ADD TO CART
    ========================= */

    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            const existingItem = cartItems.find(
                item => item.name === name
            );

            if (existingItem) {

                existingItem.quantity++;

            } else {

                cartItems.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            updateCart();
            openCart();

        });

    });


    /* =========================
       SPECIAL ITEM
    ========================= */

    const specialButton = document.querySelector(".add-special");

    specialButton.addEventListener("click", () => {

        const existingItem = cartItems.find(
            item => item.name === "Caramel Cold Brew"
        );

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cartItems.push({
                name: "Caramel Cold Brew",
                price: 169,
                quantity: 1
            });

        }

        updateCart();
        openCart();

    });


    /* =========================
       UPDATE CART
    ========================= */

    function updateCart() {

        cartItemsContainer.innerHTML = "";

        if (cartItems.length === 0) {

            cartItemsContainer.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

            cartTotal.textContent = "₹0";
            return;
        }


        let total = 0;


        cartItems.forEach((item, index) => {

            total += item.price * item.quantity;


            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>
                        ₹${item.price}
                    </span>

                </div>


                <div class="cart-quantity">

                    <button data-action="minus" data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button data-action="plus" data-index="${index}">
                        +
                    </button>

                </div>

            `;

            cartItemsContainer.appendChild(cartItem);

        });


        cartTotal.textContent = `₹${total}`;


        /* Quantity buttons */

        document.querySelectorAll(".cart-quantity button")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.index);

                    const action =
                        button.dataset.action;


                    if (action === "plus") {

                        cartItems[index].quantity++;

                    }


                    if (action === "minus") {

                        cartItems[index].quantity--;

                        if (cartItems[index].quantity <= 0) {

                            cartItems.splice(index, 1);

                        }

                    }


                    updateCart();

                });

            });

    }


    /* =========================
       WHATSAPP ORDER
    ========================= */

    const whatsappButton =
        document.querySelector(".whatsapp-order");


    whatsappButton.addEventListener("click", () => {

        if (cartItems.length === 0) {

            alert("Please add something to your order first.");

            return;

        }


        let message =
            "Hello Brew & Bean! ☕%0A%0AI would like to order:%0A";


        let total = 0;


        cartItems.forEach(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            message +=
                `• ${item.name} × ${item.quantity} — ₹${itemTotal}%0A`;

        });


        message +=
            `%0A*Total: ₹${total}*%0A%0AThank you!`;


        /* Replace this demo number with client's WhatsApp number */

        const phoneNumber = "919876543210";


        const whatsappURL =
            `https://wa.me/${phoneNumber}?text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    });


    /* =========================
       FLOATING WHATSAPP
    ========================= */

    const floatingWhatsapp =
        document.querySelector(".floating-whatsapp");


    floatingWhatsapp.addEventListener("click", event => {

        event.preventDefault();

        const phoneNumber = "919876543210";

        window.open(
            `https://wa.me/${phoneNumber}`,
            "_blank"
        );

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section, .special-section, .contact-section"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =========================
       ACTIVE NAV LINK
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-links a");


    window.addEventListener("scroll", () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


});
