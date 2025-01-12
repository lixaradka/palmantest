document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.querySelector('.buy-button .add-to-cart');
    const cartAlert = document.getElementById('cart-alert');
    const showCartButton = document.getElementById('show-cart');
    const bag = document.querySelector('.bag');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartCounter() {
        const bagCounter = document.querySelector('.bag-counter');
        if (!bagCounter) return;

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

    function addToCart(product) {
        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCounter();
    }

    addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
    
        const productId = addToCartButton.dataset.id;
        const productName = addToCartButton.dataset.name;
        const productPrice = parseFloat(addToCartButton.dataset.price);
        const productImage = addToCartButton.dataset.image;
    
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        };
    
        addToCart(product);
    
        // Показать оповещение
        cartAlert.classList.remove('hidden');
    });
    
    showCartButton.addEventListener('click', () => {
        console.log('Showing cart');
        cartAlert.classList.add('hidden');
        bag.classList.add('active');
        updateCartDisplay();
    });

    updateCartCounter();

    // Сменить фото в галерее
    const galleryContainer = document.getElementById('product-gallery');

    galleryContainer.addEventListener('click', (event) => {
        // Проверка, что клик был по изображению
        if (event.target.tagName === 'IMG') {
            const activePhoto = document.querySelector('.div-active-photo img');
            if (activePhoto) {
                activePhoto.src = event.target.src;
            }
        }
    });
    

    // Пример данных для продукта
    const products = {
        "Omega Watch": {
            name1: "Omega Seamaster",
            name: "Omega Seamaster Aqua Terra 150M",
            description: "An iconic watch with automatic movement and 150m water resistance.",
            specs: [
                "Material: Stainless steel",
                "Diameter: 41 mm",
                "Movement: Automatic",
                "Water resistance: 150 meters"
            ],
            image: "../imgs/mechwatch.jpg",
            gallery: [
                "../imgs/mechwatch.jpg",
                "../imgs/tarcza2.png",
                "../imgs/tarcza1.png",
                "../imgs/tarcza2.png"
            ]
        },
        "G-shock Watch": {
            name1: "Casio G-Shock",
            name: "G-Shock GA-100",
            description: "A rugged and durable watch designed for outdoor activities.",
            specs: [
                "Material: DuraHard plastic",
                "Diameter: 46 mm",
                "Movement: Quartz",
                "Water resistance: 20 ATM"
            ],
            image: "../imgs/g-shok.png",
            gallery: [
                "../imgs/g-shok.png",
                "../imgs/tarcza2.png",
                "../imgs/tarcza1.png",
                "../imgs/tarcza2.png"
            ]
        },
    };

    // Извлекаем ID продукта из URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Убедитесь, что это совпадает с 'id' в вашей ссылке
    

    // Проверка наличия продукта
    const product = products[productId];

    if (product) {
        // Обновление данных на странице
        document.getElementById('product-name-1').textContent = product.name1;
        document.getElementById('product-name').querySelector('h2').textContent = product.name;
        
        // Обновляем характеристики
        const specsList = document.getElementById('product-specs');
        product.specs.forEach(spec => {
            const listItem = document.createElement('li');
            listItem.textContent = spec;
            specsList.appendChild(listItem);
        });

        // Обновление основного изображения
        document.getElementById('main-product-img').src = product.image;
        
        // Обновление галереи
        product.gallery.forEach(image => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('scroll-img');
            const img = document.createElement('img');
            img.src = image;
            img.alt = "Product Image";
            imgElement.appendChild(img);
            galleryContainer.appendChild(imgElement);
        });
    } else {
        console.error(`Product not found: ${productId}`);
    }
    console.log(productId); // Должно выводить "G-shock Watch"
});
