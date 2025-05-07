import productsData from './products.js';

document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progress');
    const currentStepDisplay = document.getElementById('current-step');
    const steps = document.querySelectorAll('.step');
    const productsDivs = Array.from(document.querySelectorAll('.products'));
    const selectedProductsDiv = document.getElementById('selected-products');
    const selectedProductsList = document.getElementById('selected-products-list');
    const totalPriceDisplay = document.getElementById('total-price');

    let currentStep = 1;
    let selectedProducts = [];
    let totalPrice = 0;

    function updateProgress() {
        const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        currentStepDisplay.textContent = currentStep;
    }

    function hideAllSteps() {
        steps.forEach(step => step.style.display = 'none');
    }

    function showStep(stepNumber) {
        hideAllSteps();
        document.getElementById(`step${stepNumber}`).style.display = 'block';
        document.querySelector('.progress-container').style.display = (stepNumber === 7) ? 'none' : 'block';
        updateActiveCategoryHighlighting();
        selectedProductsDiv.style.display = selectedProducts.length > 0 ? 'block' : 'none';
    }

    function loadProducts(stepNumber, category = null) {
        const productsDiv = productsDivs[stepNumber - 1];
        productsDiv.innerHTML = '';

        const productsToDisplay = category ? productsData[`step${stepNumber}-${category}`] || [] : getRandomProducts(9, stepNumber);
        if (stepNumber === 6) {
            productsToDisplay = [
                productsData['step6-no-scent'][0],
                productsData['step6-fruity-floral'][0],
                productsData['step6-woody-fruity'][0],
                productsData['step6-woody-floral'][0],
                productsData['step6-woody-musky'][0]
            ];
        }

        productsToDisplay.forEach(product => {
            const productDiv = createProductDiv(product);
            productsDiv.appendChild(productDiv);
        });

        updateProductButtons(productsDiv);
    }

    function createProductDiv(product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        productDiv.appendChild(img);

        const productInfoDiv = document.createElement('div');
        productInfoDiv.classList.add('product-info');
        productInfoDiv.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price === 0 ? 'Бесплатно' : `${product.price} рублей`}</div>
        `;
        productDiv.appendChild(productInfoDiv);

        const selectButton = document.createElement('button');
        selectButton.classList.add('select-button');
        selectButton.textContent = 'Выбрать';
        selectButton.dataset.name = product.name;
        selectButton.dataset.price = product.price;

        selectButton.addEventListener('click', selectProduct);
        productDiv.appendChild(selectButton);

        return productDiv;
    }

    function updateProductButtons(productsDiv) {
        const selectButtons = productsDiv.querySelectorAll('.select-button');
        selectButtons.forEach(button => {
            const product = { name: button.dataset.name, price: parseFloat(button.dataset.price) };
            if (isProductSelected(product)) {
                button.textContent = 'Удалить';
                button.classList.add('selected');
            } else {
                button.textContent = 'Выбрать';
                button.classList.remove('selected');
            }
        });
    }

    function isProductSelected(product) {
        return selectedProducts.some(p => p.name === product.name);
    }

    function selectProduct(event) {
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);
        const product = { name: productName, price: productPrice, image: 'placeholder.jpg' };
        const selectButton = event.target;

        if (isProductSelected(product)) {
            removeProduct(product);
            selectButton.textContent = 'Выбрать';
            selectButton.classList.remove('selected');
        } else {
            selectedProducts.push(product);
            selectButton.textContent = 'Удалить';
            selectButton.classList.add('selected');
        }

        updateSelectedProductsDisplay();
        loadProducts(currentStep); // Refresh product buttons
    }

    function removeProduct(product) {
        selectedProducts = selectedProducts.filter(p => p.name !== product.name);
        updateSelectedProductsDisplay();
    }

    function updateSelectedProductsDisplay() {
        selectedProductsList.innerHTML = ''; // Clear existing display
        totalPrice = 0;

        selectedProducts.forEach((product, index) => {
            const selectedProductDiv = createSelectedProductDiv(product, index);
            selectedProductsList.appendChild(selectedProductDiv);
            totalPrice += product.price;
        });

        totalPriceDisplay.textContent = totalPrice > 0 ? totalPrice : '0';
        selectedProductsDiv.style.display = selectedProducts.length > 0 ? 'block' : 'none';
    }

    function createSelectedProductDiv(product, index) {
        const selectedProductDiv = document.createElement('div');
        selectedProductDiv.classList.add('selected-product');

        selectedProductDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price === 0 ? 'Бесплатно' : `${product.price} рублей`}</div>
        `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
            removeProduct(product);
        });
        selectedProductDiv.appendChild(removeButton);

        return selectedProductDiv;
    }

    function updateActiveCategoryHighlighting() {
        document.querySelectorAll('.category-buttons button').forEach(button => {
            button.classList.remove('active');
        });

        const activeButton = document.querySelector(`.category-buttons button[data-category="${selectedCategories[currentStep]}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    function attachNavigationEventListeners(step) {
        const prevButton = step.querySelector('#prev-button');
        const nextButton = step.querySelector('#next-button');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    showStep(currentStep);
                    updateProgress();
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                    updateProgress();
                }
            });
        }
    }

    // Attach event listeners to navigation buttons for each step
    steps.forEach(step => {
        attachNavigationEventListeners(step);
    });

    // Initial setup
    showStep(currentStep);
    updateProgress();
});
