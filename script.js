let currentStep = 1;
const totalSteps = 5;
const selectedOptions = {};
let additionalProducts = []; // Array to store additional products
let baseProductSelected = false; // Flag to track if a base product is selected

// Sample product data (replace with your actual data)
const productData = {
    1: { // Step 1: Boxes
        kraft: [
            { name: "Гофрокоробка 1", price: 500, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 2", price: 600, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 3", price: 700, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 4", price: 500, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 5", price: 600, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 6", price: 700, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 7", price: 500, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 8", price: 600, image: "https://via.placeholder.com/100" },
            { name: "Гофрокоробка 9", price: 700, image: "https://via.placeholder.com/100" }
        ],
        thick: [
            { name: "Толстая коробка 1", price: 800, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 2", price: 900, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 3", price: 1000, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 4", price: 800, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 5", price: 900, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 6", price: 1000, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 7", price: 800, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 8", price: 900, image: "https://via.placeholder.com/100" },
            { name: "Толстая коробка 9", price: 1000, image: "https://via.placeholder.com/100" }
        ],
        premium: [
            { name: "Премиум коробка 1", price: 1100, image: "https://via.placeholder.com/100" },
            { name: "Премиум коробка 2", price: 1200, image: "https://via.placeholder.com/100" },
            { name: "Премиум коробка 3", price: 1300, image: "https://via.placeholder.com/100" },
             { name: "Премиум коробка 4", price: 1100, image: "https://via.placeholder.com/100" },
            { name: "Премиум коробка 5", price: 1200, image: "https://via.placeholder.com/100" },
            { name: "Премиум коробка 6", price: 1300, image: "https://via.placeholder.com/100" },
             { name: "Премиум коробка 7", price: 1100, image: "https://via.placeholder.com/100" },
            { name: "Премиум коробка 8", price: 1200, image: "https://via.placeholder.com/100" },
            { name: "Премиум коробка 9", price: 1300, image: "https://via.placeholder.com/100" }
        ],
        none: [] // No products
    },
    2: { // Step 2: Fillers
        tissue: [
             { name: "tissue 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "tissue 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "tissue 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "tissue 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "tissue 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "tissue 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "tissue 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "tissue 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "tissue 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        paper: [
            { name: "paper 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "paper 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "paper 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "paper 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "paper 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "paper 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "paper 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "paper 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "paper 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        foam: [
            { name: "foam 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "foam 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "foam 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "foam 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "foam 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "foam 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "foam 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "foam 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "foam 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        feathers: [
            { name: "feathers 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "feathers 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "feathers 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "feathers 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "feathers 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "feathers 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "feathers 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "feathers 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "feathers 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        hearts: [
            { name: "hearts 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "hearts 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "hearts 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "hearts 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "hearts 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "hearts 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "hearts 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "hearts 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "hearts 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        none: []
    },
    3: { // Step 3: Wrapping
        kraft_plain: [
             { name: "kraft_plain 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "kraft_plain 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "kraft_plain 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "kraft_plain 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "kraft_plain 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "kraft_plain 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "kraft_plain 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "kraft_plain 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "kraft_plain 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        kraft_color: [
             { name: "kraft_color 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "kraft_color 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "kraft_color 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "kraft_color 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "kraft_color 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "kraft_color 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "kraft_color 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "kraft_color 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "kraft_color 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        wrapping_color: [
             { name: "wrapping_color 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "wrapping_color 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "wrapping_color 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "wrapping_color 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "wrapping_color 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "wrapping_color 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "wrapping_color 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "wrapping_color 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "wrapping_color 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        none: []
    },
    4: { // Step 4: Cards
        mini: [
             { name: "mini 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "mini 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "mini 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "mini 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "mini 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "mini 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "mini 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "mini 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "mini 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        "3d": [
             { name: "3d 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "3d 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "3d 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "3d 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "3d 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "3d 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "3d 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "3d 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "3d 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        audio: [
             { name: "audio 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "audio 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "audio 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "audio 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "audio 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "audio 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "audio 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "audio 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "audio 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        none: []
    },
    5: { // Step 5: Packages
        kraft_bow: [
             { name: "kraft_bow 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "kraft_bow 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "kraft_bow 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "kraft_bow 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "kraft_bow 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "kraft_bow 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "kraft_bow 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "kraft_bow 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "kraft_bow 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        kraft_color_bow: [
             { name: "kraft_color_bow 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "kraft_color_bow 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "kraft_color_bow 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "kraft_color_bow 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "kraft_color_bow 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "kraft_color_bow 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "kraft_color_bow 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "kraft_color_bow 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "kraft_color_bow 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        cardboard_ribbon: [
             { name: "cardboard_ribbon 1", price: 100, image: "https://via.placeholder.com/100" },
            { name: "cardboard_ribbon 2", price: 100, image: "https://via.placeholder.com/100" },
             { name: "cardboard_ribbon 3", price: 100, image: "https://via.placeholder.com/100" },
              { name: "cardboard_ribbon 4", price: 100, image: "https://via.placeholder.com/100" },
               { name: "cardboard_ribbon 5", price: 100, image: "https://via.placeholder.com/100" },
                { name: "cardboard_ribbon 6", price: 100, image: "https://via.placeholder.com/100" },
                 { name: "cardboard_ribbon 7", price: 100, image: "https://via.placeholder.com/100" },
                  { name: "cardboard_ribbon 8", price: 100, image: "https://via.placeholder.com/100" },
                   { name: "cardboard_ribbon 9", price: 100, image: "https://via.placeholder.com/100" }
        ],
        none: []
    }
};

function getRandomProducts(step, count = 9) {
    const allTypes = Object.keys(productData[step]);
    const randomProducts = [];

    while (randomProducts.length < count && allTypes.length > 0) {
        const typeIndex = Math.floor(Math.random() * allTypes.length);
        const type = allTypes[typeIndex];
        const productsOfType = productData[step][type];

        if (productsOfType && productsOfType.length > 0) {
            const productIndex = Math.floor(Math.random() * productsOfType.length);
            const product = productsOfType[productIndex];
            randomProducts.push(product);
        }

        allTypes.splice(typeIndex, 1); // Prevent duplicates and infinite loops
    }

    return randomProducts;
}

function showInitialSuggestions(step) {
    const suggestionsContainer = document.getElementById(`product-suggestions-${step}`);
    suggestionsContainer.innerHTML = '';

    const randomProducts = getRandomProducts(step);

    randomProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price} руб</div>
            <button onclick="addAdditionalProduct(${step}, '${Object.keys(productData[step]).find(key => productData[step][key].includes(product))}', '${product.name}')">Выбрать</button>
        `;
        suggestionsContainer.appendChild(productCard);
    });
}

function showSuggestions(step) {
    const suggestionsContainer = document.getElementById(`product-suggestions-${step}`);
    suggestionsContainer.innerHTML = '';

    // Get the selected product type for the current step
    const selectedProductType = selectedOptions[step];

    if (selectedProductType && productData[step] && productData[step][selectedProductType]) {
        const products = productData[step][selectedProductType];
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} руб</div>
                <button onclick="addAdditionalProduct(${step}, '${selectedProductType}', '${product.name}')">Выбрать</button>
            `;
            suggestionsContainer.appendChild(productCard);
        });
    } else {
        suggestionsContainer.textContent = 'Нет предложений для этого выбора.';
    }
}

function addAdditionalProduct(step, productType, productName) {
    const product = productData[step][productType].find(p => p.name === productName);
    if (product) {
        additionalProducts.push({
            step: step,
            type: productType,
            name: product.name,
            price: product.price,
            image: product.image
        });
        updateSelectedProductsList();
    }
}

function removeAdditionalProduct(index) {
    additionalProducts.splice(index, 1);
    updateSelectedProductsList();
}

function removeAllAdditionalProducts() {
    additionalProducts = [];
    updateSelectedProductsList();
}

function updateSelectedProductsList() {
    const selectedProductsList = document.getElementById('selected-products-list');
    selectedProductsList.innerHTML = '';

    additionalProducts.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('selected-product-item');
        productItem.innerHTML = `
            <span>${product.name} (${product.price} руб)</span>
            <button class="remove-button" onclick="removeAdditionalProduct(${index})">Удалить</button>
        `;
        selectedProductsList.appendChild(productItem);
    });

    const selectedProductsDiv = document.getElementById('selected-products');
    selectedProductsDiv.classList.toggle('hidden', additionalProducts.length === 0);
}

function selectOption(button, step) {
    const buttons = button.parentNode.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    selectedOptions[step] = button.dataset.productType;
    baseProductSelected = true;
    showSuggestions(step);
}

function updateButtonsVisibility() {
    document.getElementById('back').classList.toggle('hidden', currentStep === 1);
    document.getElementById('next').classList.toggle('hidden', currentStep === totalSteps);
    document.getElementById('calculate').classList.toggle('hidden', currentStep !== totalSteps);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progress}%`;
}

function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
    document.querySelector(`.step[data-step="${step}"]`).classList.remove('hidden');
    document.getElementById('current-step').textContent = step;
    updateButtonsVisibility();

    // Show initial suggestions if no base product is selected
    if (!baseProductSelected) {
        showInitialSuggestions(step);
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        baseProductSelected = false; // Reset the flag when moving to the next step
        showStep(currentStep);
        updateProgressBar();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        baseProductSelected = false; // Reset the flag when moving to the previous step
        showStep(currentStep);
        updateProgressBar();
    }
}

function calculateTotal() {
    let totalPrice = 0;

    additionalProducts.forEach(product => {
        totalPrice += product.price;
    });

    document.getElementById('summary-content').textContent = `Итоговая стоимость: ${totalPrice} руб`;
    document.getElementById('summary').classList.remove('hidden');
}

// Initialize the first step
showStep(currentStep);
updateProgressBar();
updateSelectedProductsList();
