document.addEventListener("DOMContentLoaded", () => {
    const popupBtn = document.querySelector('.popup-btn');
    const popupCat = document.querySelector('.popup-cat');

    if (popupBtn && popupCat) {
        popupBtn.addEventListener('click', () => {
            popupCat.classList.toggle('active');

            // Поворачиваем стрелку
            if (popupCat.classList.contains('active')) {
                popupBtn.style.transform = 'rotate(180deg)';
            } else {
                popupBtn.style.transform = 'rotate(0deg)';
            }
        });
    }

    const slides = document.querySelectorAll(".slider-content");
    const dotsContainer = document.querySelector(".dots");
    let currentSlide = 0;

    if (slides.length > 0 && dotsContainer) {
        slides.forEach(() => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dots span");

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");

        const updateSlide = (direction) => {
            slides[currentSlide].classList.remove("active");
            dots[currentSlide].classList.remove("active");

            if (direction === "next") {
                currentSlide = (currentSlide + 1) % slides.length;
            } else if (direction === "prev") {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            }

            slides[currentSlide].classList.add("active");
            dots[currentSlide].classList.add("active");
        };

        const prevButton = document.querySelector(".scroll-btn .prev");
        const nextButton = document.querySelector(".scroll-btn .next");

        if (prevButton && nextButton) {
            prevButton.addEventListener("click", () => updateSlide("prev"));
            nextButton.addEventListener("click", () => updateSlide("next"));
        }
    }

    const addToCartButtons = document.querySelectorAll('.buy-button .add-to-cart');
    const cartItemsList = document.querySelector('.bag-list');
    const emptyCartMessage = document.querySelector('.text');
    const bagButton = document.getElementById('bag-btn');
    const bag = document.querySelector('.bag');
    const backButton = document.getElementById('back');

    if (backButton) {
        backButton.addEventListener('click', () => {
            bag.classList.toggle('active');
        });
    }

    if (bagButton) {
        bagButton.addEventListener('click', () => {
            bag.classList.toggle('active');
            if (bag.classList.contains('active')) {
                updateCartDisplay();
            }
        });
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartDisplay() {
        if (!cartItemsList || !emptyCartMessage) return;

        cartItemsList.innerHTML = '';

        if (cartItems.length === 0) {
            emptyCartMessage.classList.add('active');
        } else {
            emptyCartMessage.classList.remove('active'); 
            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('bag-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-box">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <div class="basket remove-from-cart" data-id="${item.id}">
                                <img src="../imgs/basket.png" alt="Удалить">
                                <h4>Удалить</h4>
                            </div>
                        </div>
                        <div class="item-info2">
                            <div class="amount">
                                <img class="decrease-amount" src="../imgs/minus.png" data-id="${item.id}" alt="Minus">
                                <div class="number">${item.quantity}</div>
                                <img class="increase-amount" src="../imgs/plus.png" data-id="${item.id}" alt="Plus">
                            </div>
                            <div class="price">${item.price}$</div>
                        </div>
                    </div>
                `;
                cartItemsList.appendChild(cartItemElement);

                updateTotalPrice();

                const removeButton = cartItemElement.querySelector('.remove-from-cart');
                if (removeButton) {
                    removeButton.addEventListener('click', () => {
                        removeFromCart(item.id);
                    });
                }

                const decreaseButton = cartItemElement.querySelector('.decrease-amount');
                if (decreaseButton) {
                    decreaseButton.addEventListener('click', () => {
                        changeQuantity(item.id, -1);
                    });
                }

                const increaseButton = cartItemElement.querySelector('.increase-amount');
                if (increaseButton) {
                    increaseButton.addEventListener('click', () => {
                        changeQuantity(item.id, 1);
                    });
                }
            });
        }
    } 

    function updateTotalPrice() {
        const priceElement = document.getElementById('price');
        if (!priceElement) return;

        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        priceElement.textContent = totalPrice.toFixed(2) + '$';
    }

    function updateCartAfterChange() {
        updateCartDisplay();
        updateTotalPrice();
        updateCartCounter();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function removeFromCart(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        updateCartAfterChange();
    }

    function changeQuantity(id, amount) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            updateCartAfterChange();
        }
    }

    if (bagButton) {
        const bagCounter = document.createElement('span');
        bagCounter.classList.add('bag-counter');
        bagButton.appendChild(bagCounter);

        function updateCartCounter() {
            let totalQuantity = 0;
            cartItems.forEach(item => {
                totalQuantity += item.quantity;
            });
            bagCounter.textContent = totalQuantity;

            if (totalQuantity === 0) {
                bagCounter.style.display = 'none';
            } else {
                bagCounter.style.display = 'flex';
            }
        }

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const productId = button.dataset.id;
                const productName = button.dataset.name;
                const productPrice = parseFloat(button.dataset.price);
                const productImage = button.dataset.image;

                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage 
                }; 

                function addToCart(product) {
                    // Check if the product is already in the cart
                    const existingProduct = cartItems.find(item => item.id === product.id);
                
                    if (existingProduct) {
                        // If the product is already in the cart, increase its quantity
                        existingProduct.quantity += 1;
                    } else {
                        // If the product is not in the cart, add it with a quantity of 1
                        product.quantity = 1;
                        cartItems.push(product);
                    }
                
                    // Update the cart in local storage
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                    // Update the cart display and counter
                    updateCartDisplay();
                    updateCartCounter();
                }
                
                addToCart(product);
                updateCartCounter();
            });
        });

        updateCartDisplay();
        updateCartCounter();
    }
});
