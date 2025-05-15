document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progress');
    const stepCount = document.getElementById('step-count');
    const currentStepDisplay = document.getElementById('current-step');
    const steps = document.querySelectorAll('.step');
    const productsDivs = [
        document.getElementById('products'),
        document.getElementById('products2'),
        document.getElementById('products3'),
        document.getElementById('products4'),
        document.getElementById('products5'),
        document.getElementById('products6')
    ];
    const individualPackageMessage = document.getElementById('individual-package-message');
    const selectedProductsDiv = document.getElementById('selected-products');
    const selectedProductsList = document.getElementById('selected-products-list');
    const totalPriceDisplay = document.getElementById('total-price');

    let currentStep = 1;
    let selectedProducts = [];
    let totalPrice = 0;
    let productsData = {};
    let selectedCategories = {};
    let currentSort = { by: null, order: 'asc' };

    const products = {
        'step1-kraft-bow': [
            { name: 'Крафтовый пакет с бантом', price: 0, image: 'placeholder.jpg' }
        ],
        'step1-pvc': [
            { name: 'ПВХ пакет', price: 0, image: 'placeholder.jpg' }
        ],
        'step1-kraft-print': [
            { name: 'Крафтовый пакет с принтом', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 2', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 3', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 4', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 5', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 6', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 7', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 8', price: 100, image: 'placeholder.jpg' },
            { name: 'Крафтовый пакет с принтом 9', price: 100, image: 'placeholder.jpg' }
        ],
        'step1-cardboard': [
            { name: 'Пакет из картона', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 2', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 3', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 4', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 5', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 6', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 7', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 8', price: 120, image: 'placeholder.jpg' },
            { name: 'Пакет из картона 9', price: 120, image: 'placeholder.jpg' }
        ],
        'step2-no-box': [
            { name: 'Крафтовый конверт', price: 0, image: 'placeholder.jpg' },
            { name: 'Зип-пакет черный', price: 0, image: 'placeholder.jpg' }
        ],
        'step2-kraft-corrugated': [
            { name: 'Коробка из гофрокартона', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 2', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 3', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 4', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 6', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 7', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 8', price: 150, image: 'placeholder.jpg' },
            { name: 'Коробка из гофрокартона 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step2-thick-cardboard': [
            { name: 'Коробка из толстого картона', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 2', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 3', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 4', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 5', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 6', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 7', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 8', price: 200, image: 'placeholder.jpg' },
            { name: 'Коробка из толстого картона 9', price: 200, image: 'placeholder.jpg' }
        ],
        'step3-tissue-paper': [
            { name: 'Подложка из бумаги тишью', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 2', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 3', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 4', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 5', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 6', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 7', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 8', price: 80, image: 'placeholder.jpg' },
            { name: 'Подложка из бумаги тишью 9', price: 80, image: 'placeholder.jpg' }
        ],
        'step3-corrugated-paper': [
            { name: 'Бумажный наполнитель гофрированный', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 2', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 3', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 4', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 5', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 6', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 7', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 8', price: 90, image: 'placeholder.jpg' },
            { name: 'Бумажный наполнитель гофрированный 9', price: 90, image: 'placeholder.jpg' }
        ],
        'step3-tissue': [
            { name: 'Тишью наполнитель', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 2', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 3', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 4', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 5', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 6', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 7', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 8', price: 100, image: 'placeholder.jpg' },
            { name: 'Тишью наполнитель 9', price: 100, image: 'placeholder.jpg' }
        ],
        'step3-foam': [
            { name: 'Пенопластовый наполнитель', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 2', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 3', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 4', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 5', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 6', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 7', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 8', price: 70, image: 'placeholder.jpg' },
            { name: 'Пенопластовый наполнитель 9', price: 70, image: 'placeholder.jpg' }
        ],
        'step3-feathers': [
            { name: 'Наполнитель из перьев', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 2', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 3', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 4', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 6', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 7', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 8', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step3-hearts': [
            { name: 'Наполнитель из атласных сердец', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 2', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 3', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 4', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 6', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 7', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 8', price: 200, image: 'placeholder.jpg' },
            { name: 'Наполнитель из атласных сердец 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step4-kraft-plain': [
            { name: 'Крафтовая бумага без цвета', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 2', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 3', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 4', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 6', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 7', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 8', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step4-kraft-print': [
            { name: 'Крафтовая бумага с принтом', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 2', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 3', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 4', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 6', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 7', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 8', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step4-wrapping-paper': [
            { name: 'Оберточная бумага с принтом', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 2', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 3', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 4', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 6', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 7', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 8', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step5-mini-card': [
            { name: 'Мини открытка', price: 0, image: 'placeholder.jpg' }
        ],
        'step5-mini-design': [
            { name: 'Мини открытка с дизайном', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 2', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 3', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 4', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 6', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 7', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 8', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step5-3d-card': [
            { name: 'Открытка с 3D разворотом', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 2', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 3', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 4', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 6', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 7', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 8', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step5-audio-card': [
            { name: 'Аудио открытка', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 2', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 3', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 4', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 5', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 6', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 7', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 8', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step6-no-scent': [
            { name: 'Без запаха', price: 0, image: 'placeholder.jpg' }
        ],
        'step6-fruity-floral': [
            { name: 'Аромат фруктово-цветочный', price: 0, image: 'placeholder.jpg' },
        ],
        'step6-woody-fruity': [
            { name: 'Аромат древесно-фруктовый', price: 0, image: 'placeholder.jpg' },
        ],
        'step6-woody-floral': [
            { name: 'Аромат древесные цветочные', price: 0, image: 'placeholder.jpg' },
        ],
        'step6-woody-musky': [
            { name: 'Аромат древесные мускусные', price: 0, image: 'placeholder.jpg' }
        ]
    };

    productsData = products;

    loadProducts(currentStep);

    function updateProgress() {
        const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        currentStepDisplay.textContent = currentStep;
    }

    function hideAllSteps() {
        steps.forEach(step => {
            step.style.display = 'none';
        });
    }

    function showStep(stepNumber) {
        hideAllSteps();
        const stepElement = document.getElementById(`step${stepNumber}`);
        stepElement.style.display = 'block';
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (stepNumber === 7) {
            document.querySelector('.progress-container').style.display = 'none';
            updateSelectedProductsDisplay();
        } else {
            document.querySelector('.progress-container').style.display = 'block';
        }

        updateActiveCategoryHighlighting();

        if (selectedProducts.length > 0) {
            selectedProductsDiv.style.display = 'block';
        } else {
            selectedProductsDiv.style.display = 'none';
        }
    }

    function sortProducts(products, by, order) {
        return products.sort((a, b) => {
            let comparison = 0;
            if (by === 'price') {
                comparison = a.price - b.price;
            } else if (by === 'name') {
                comparison = a.name.localeCompare(b.name);
            }
            return order === 'asc' ? comparison : comparison * -1;
        });
    }

    function loadProducts(stepNumber, category = null) {
        const productsDiv = productsDivs[stepNumber - 1];

        if (!productsDiv) {
            console.error(`productsDiv for step ${stepNumber} is undefined`);
            return;
        }

        productsDiv.innerHTML = '';

        let productsToDisplay = [];

        if (category) {
            productsToDisplay = productsData[`step${stepNumber}-${category}`] || [];
        } else {
            let allProductsForStep = [];
            for (const key in productsData) {
                if (key.startsWith(`step${stepNumber}-`)) {
                    allProductsForStep = allProductsForStep.concat(productsData[key]);
                }
            }
            productsToDisplay = allProductsForStep;
        }

        productsToDisplay.sort((a, b) => {
            if (a.price === 0 && b.price !== 0) {
                return -1;
            } else if (a.price !== 0 && b.price === 0) {
                return 1;
            } else if (a.price === 0 && b.price === 0) {
                return a.name.localeCompare(b.name);
            } else {
                return 0;
            }
        });

        if (currentSort.by) {
            productsToDisplay = sortProducts(productsToDisplay, currentSort.by, currentSort.order);
        }

        productsToDisplay.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            productDiv.appendChild(img);

            const productInfoDiv = document.createElement('div');
            productInfoDiv.classList.add('product-info');

            const productNameDiv = document.createElement('div');
            productNameDiv.classList.add('product-name');
            productNameDiv.textContent = product.name;
            productInfoDiv.appendChild(productNameDiv);

            const productPriceDiv = document.createElement('div');
            productPriceDiv.classList.add('product-price');
            productPriceDiv.textContent = product.price === 0 ? 'Бесплатно' : `${product.price}  ₽`;
            productInfoDiv.appendChild(productPriceDiv);

            productDiv.appendChild(productInfoDiv);

            const selectButton = document.createElement('button');
            selectButton.classList.add('select-button');
            selectButton.textContent = isProductSelected(product) ? `Удалить (${getProductQuantity(product)})` : `Выбрать`;
            selectButton.dataset.name = product.name;
            selectButton.dataset.price = product.price;
            productDiv.appendChild(selectButton);

            if (product.price > 0 && isProductSelected(product)) {
                const addButton = document.createElement('button');
                addButton.classList.add('add-button');
                addButton.textContent = 'Добавить';
                productDiv.appendChild(addButton);
            }

            if (isProductSelected(product)) {
                selectButton.classList.add('selected');
            }

            productsDiv.appendChild(productDiv);
        });

        const selectButtons = productsDiv.querySelectorAll('.select-button');
        selectButtons.forEach(button => {
            button.addEventListener('click', selectProduct);
        });
        const addButtons = productsDiv.querySelectorAll('.add-button');
        addButtons.forEach(button => {
            button.addEventListener('click', addProduct);
        });

        updateActiveCategoryHighlighting();

        const sortDropdown = document.querySelector(`#step${stepNumber} .sort-dropdown`);
        if (sortDropdown) {
            sortDropdown.style.display = productsToDisplay.length >= 6 ? 'inline-block' : 'none';
        }
    }

    function isProductSelected(product) {
        return selectedProducts.some(p => p.name === product.name);
    }

    function getProductQuantity(product) {
        const selectedProduct = selectedProducts.find(p => p.name === product.name);
        return selectedProduct ? selectedProduct.quantity : 0;
    }

    function addProduct(event) {
        const productName = event.target.parentNode.querySelector('.select-button').dataset.name;
        const productPrice = parseFloat(event.target.parentNode.querySelector('.select-button').dataset.price);
        const product = { name: productName, price: productPrice, image: 'placeholder.jpg', quantity: 1 };

        const existingProductIndex = selectedProducts.findIndex(p => p.name === product.name);

        if (existingProductIndex !== -1) {
            selectedProducts[existingProductIndex].quantity++;
        } else {
            selectedProducts.push(product);
        }
        updateSelectedProductsDisplay();
        loadProducts(currentStep, selectedCategories[currentStep]);
    }

    function selectProduct(event) {
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);
        const product = { name: productName, price: productPrice, image: 'placeholder.jpg', quantity: 1 };
        const selectButton = event.target;

        const isSelected = isProductSelected(product);

        if (isSelected) {
            const index = selectedProducts.findIndex(p => p.name === product.name);
            removeProductFromSelected(index);
            selectButton.textContent = 'Выбрать';
            selectButton.classList.remove('selected');
        } else {
            selectedProducts.push(product);
            selectButton.textContent = `Удалить (${getProductQuantity(product)})`;
            selectButton.classList.add('selected');
        }

        updateSelectedProductsDisplay();
        loadProducts(currentStep, selectedCategories[currentStep]);
    }

    function removeProductFromSelected(index) {
        const removedProduct = selectedProducts[index];
        selectedProducts.splice(index, 1);
        updateSelectedProductsDisplay();
        loadProducts(currentStep);
    }

    function updateSelectedProductsDisplay() {
        selectedProductsList.innerHTML = '';
        totalPrice = 0;

        if (selectedProducts.length > 0) {
            selectedProductsDiv.style.display = 'block';

            selectedProducts.forEach((product, index) => {
                const selectedProductDiv = document.createElement('div');
                selectedProductDiv.classList.add('selected-product');

                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name;
                selectedProductDiv.appendChild(img);

                const productNameDiv = document.createElement('div');
                productNameDiv.classList.add('product-name');
                productNameDiv.textContent = product.name;
                selectedProductDiv.appendChild(productNameDiv);

                const productPriceDiv = document.createElement('div');
                productPriceDiv.classList.add('product-price');
                productPriceDiv.textContent = product.price === 0 ? 'Бесплатно' : `${product.price}  ₽`;
                selectedProductDiv.appendChild(productPriceDiv);

                if (product.price > 0) {
                    const quantityControlDiv = document.createElement('div');
                    quantityControlDiv.classList.add('quantity-control');

                    const decreaseButton = document.createElement('button');
                    decreaseButton.classList.add('quantity-button');
                    decreaseButton.textContent = '-';
                    decreaseButton.addEventListener('click', () => changeQuantity(index, -1));
                    quantityControlDiv.appendChild(decreaseButton);

                    const quantityDisplay = document.createElement('span');
                    quantityDisplay.classList.add('quantity-display');
                    quantityDisplay.textContent = product.quantity;
                    quantityControlDiv.appendChild(quantityDisplay);

                    const increaseButton = document.createElement('button');
                    increaseButton.classList.add('quantity-button');
                    increaseButton.textContent = '+';
                    increaseButton.addEventListener('click', () => changeQuantity(index, 1));
                    quantityControlDiv.appendChild(increaseButton);

                    selectedProductDiv.appendChild(quantityControlDiv);
                }

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Удалить';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => removeProductFromSelected(index));
                selectedProductDiv.appendChild(removeButton);

                selectedProductsList.appendChild(selectedProductDiv);

                totalPrice += product.price * product.quantity;
            });

            totalPriceDisplay.textContent = totalPrice;
        } else {
            selectedProductsDiv.style.display = 'none';
            totalPriceDisplay.textContent = '0';
        }

        if (selectedProducts.length > 0) {
            selectedProductsDiv.style.display = 'block';
        } else {
            selectedProductsDiv.style.display = 'none';
        }
    }

    function changeQuantity(index, change) {
        if (selectedProducts[index].price === 0 && change !== 0) return;

        selectedProducts[index].quantity += change;

        if (selectedProducts[index].quantity < 1) {
            selectedProducts[index].quantity = 1;
        }

        updateSelectedProductsDisplay();
    }

    function updateActiveCategoryHighlighting() {
        document.querySelectorAll('.category-buttons button').forEach(button => {
            button.classList.remove('active');
        });

        if (selectedCategories[currentStep]) {
            const activeButton = document.querySelector(`.category-buttons button[data-category="${selectedCategories[currentStep]}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
    }

    document.querySelectorAll('.category-buttons button').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            selectedCategories[currentStep] = category;

            if (category === 'no-filler' || category === 'no-wrapping' || category === 'no-card' || category === 'no-scent') {
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                    updateProgress();
                    updateNextButtonText();
                    updatePrevButtonState();
                    loadProducts(currentStep);
                }
            } else {
                loadProducts(currentStep, category);
            }

            if (currentStep === 2 && category === 'no-box') {
                individualPackageMessage.style.display = 'block'; 
            } else {
                individualPackageMessage.style.display = 'none';
            }

            updateActiveCategoryHighlighting();
        });
    });

    function attachNavigationEventListeners(step) {
        const prevButton = step.querySelector('#prev-button');
        const nextButton = step.querySelector('#next-button');
        const currentStepElement = document.getElementById(`step${currentStep}`);

        if (prevButton) {
            prevButton.addEventListener('click', function() {
                if (currentStep > 1) {
                    currentStep--;
                    showStep(currentStep);
                    updateProgress();
                    updateNextButtonText();
                    updatePrevButtonState();
                    loadProducts(currentStep);
                    delete selectedCategories[currentStep + 1];
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                if (currentStep === 1) {
                    const kraftBowSelected = selectedProducts.some(p => p.name.includes('Крафтовый пакет с бантом'));
                    const pvcSelected = selectedProducts.some(p => p.name.includes('ПВХ пакет'));

                    if (!kraftBowSelected && !pvcSelected && selectedProducts.length === 0) {
                        alert('Пожалуйста, выберите хотя бы один пакет.');
                        return;
                    }
                }

                if (currentStep === 2) {
                    const individualPackageSelected = selectedProducts.some(p => p.name.includes('Крафтовый конверт') || p.name.includes('Зип-пакет черный'));
                    const boxSelected = selectedProducts.some(p => p.name.includes('Коробка'));

                    if (boxSelected && individualPackageSelected) {
                        currentStep = 3;
                        showStep(currentStep);
                        updateProgress();
                        updateNextButtonText();
                        updatePrevButtonState();
                        loadProducts(currentStep);
                        return;
                    }

                    if (!individualPackageSelected && !boxSelected) {
                        alert('Пожалуйста, выберите коробку или индивидуальную упаковку.');
                        return;
                    }

                    if (individualPackageSelected) {
                        currentStep = 5;
                        showStep(currentStep);
                        updateProgress();
                        updateNextButtonText();
                        updatePrevButtonState();
                        loadProducts(currentStep);
                        return;
                    }
                }

                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                    updateProgress();
                    updateNextButtonText();
                    updatePrevButtonState();
                    loadProducts(currentStep);
                }

                if (currentStep === 7) {
                    updateSelectedProductsDisplay();
                }
            });
        }

        if (step.id === 'step7' && prevButton) {
            const navigationButtons = step.querySelector('.navigation-buttons');
            if (navigationButtons) {
                navigationButtons.appendChild(prevButton);
            }
        }
    }

    steps.forEach(step => {
        attachNavigationEventListeners(step);
    });

    function updateNextButtonText() {
        const nextButton = document.querySelector(`#step${currentStep} #next-button`);
        if (nextButton) {
            nextButton.textContent = currentStep === steps.length - 1 ? 'Оформление' : 'Вперед';
        }
    }

    function updatePrevButtonState() {
        const prevButton = document.querySelector(`#step${currentStep} #prev-button`);
        if (prevButton) {
            prevButton.disabled = currentStep === 1;
        }
    }

    function createSortingDropdown(stepNumber) {
        const step = document.getElementById(`step${stepNumber}`);
        if (!step) return;

        const sortButton = document.createElement('button');
        sortButton.textContent = 'Сортировка';
        sortButton.classList.add('sort-dropdown-button', 'top-nav-button');
        if (stepNumber === 1) {
            sortButton.classList.add('step1-sort-button');
        }

        const sortDropdownContent = document.createElement('div');
        sortDropdownContent.classList.add('sort-dropdown-content');

        const sortByPriceButton = document.createElement('button');
        sortByPriceButton.textContent = 'По цене';
        sortByPriceButton.classList.add('sort-button');
        sortByPriceButton.addEventListener('click', () => {
            if (currentSort.by === 'price') {
                currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.by = 'price';
                currentSort.order = 'asc';
            }
            loadProducts(stepNumber, selectedCategories[stepNumber]);
            sortDropdownContent.classList.remove('show');
        });

        const sortByNameButton = document.createElement('button');
        sortByNameButton.textContent = 'По названию';
        sortByNameButton.classList.add('sort-button');
        sortByNameButton.addEventListener('click', () => {
            if (currentSort.by === 'name') {
                currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.by = 'name';
                currentSort.order = 'asc';
            }
            loadProducts(stepNumber, selectedCategories[stepNumber]);
            sortDropdownContent.classList.remove('show');
        });

        const resetSortButton = document.createElement('button');
        resetSortButton.textContent = 'Сбросить сортировку';
        resetSortButton.classList.add('sort-button');
        resetSortButton.addEventListener('click', () => {
            currentSort = { by: null, order: 'asc' };
            loadProducts(stepNumber, selectedCategories[stepNumber]);
            sortDropdownContent.classList.remove('show');
        });

        sortDropdownContent.appendChild(sortByPriceButton);
        sortDropdownContent.appendChild(sortByNameButton);
        sortDropdownContent.appendChild(resetSortButton);

        const sortDropdown = document.createElement('div');
        sortDropdown.classList.add('sort-dropdown');

        const prevButtonTop = document.createElement('button');
        prevButtonTop.textContent = 'Назад';
        prevButtonTop.classList.add('navigation-buttons', 'top-nav-button', 'prev-button-top');
        prevButtonTop.addEventListener('click', () => {
            const prevButton = document.querySelector(`#step${stepNumber} #prev-button`);
            if (prevButton) {
                prevButton.click();
            }
        });
        if (stepNumber === 1) {
            prevButtonTop.style.display = 'none';
        }

        const nextButtonTop = document.createElement('button');
        nextButtonTop.textContent = 'Вперед';
        nextButtonTop.classList.add('navigation-buttons', 'top-nav-button', 'next-button-top');
        nextButtonTop.addEventListener('click', () => {
            const nextButton = document.querySelector(`#step${stepNumber} #next-button`);
            if (nextButton) {
                nextButton.click();
            }
        });

        const topNavigation = document.createElement('div');
        topNavigation.classList.add('top-navigation');

        sortDropdown.appendChild(prevButtonTop);
        sortDropdown.appendChild(sortButton);
        sortDropdown.appendChild(nextButtonTop);
        sortDropdown.appendChild(sortDropdownContent);

        const productsDiv = document.getElementById(`products${stepNumber > 1 ? stepNumber : ''}`);
        if (productsDiv && productsDiv.parentNode) {
            const topNavigationContainer = step.querySelector('.top-navigation');
            if (!topNavigationContainer) {
                const newTopNavigationContainer = document.createElement('div');
                newTopNavigationContainer.classList.add('top-navigation');
                productsDiv.parentNode.insertBefore(newTopNavigationContainer, productsDiv);
                newTopNavigationContainer.appendChild(sortDropdown);
            }
        }

        sortButton.addEventListener('click', () => {
            sortDropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', (event) => {
            if (!event.target.closest('.sort-dropdown')) {
                sortDropdownContent.classList.remove('show');
            }
        });
    }

    function createBackToTopButton() {
        const backToTopButton = document.createElement('button');
        backToTopButton.textContent = 'Вверх';
        backToTopButton.classList.add('back-to-top-button');
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        document.body.appendChild(backToTopButton);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
    }

    steps.forEach((step, index) => {
        createSortingDropdown(index + 1);
    });

    createBackToTopButton();

    function clearAllSelections() {
        selectedProducts = [];
        selectedCategories = {};
        currentStep = 1;
        updateProgress();
        updateNextButtonText();
        updatePrevButtonState();
        showStep(currentStep);
        loadProducts(currentStep);
        updateSelectedProductsDisplay();
    }

   const step7 = document.getElementById('step7');
    if (step7) {
        const selectedProductsDiv = step7.querySelector('#selected-products');
        if (selectedProductsDiv) {
            const cartActionsDiv = document.createElement('div');
            cartActionsDiv.classList.add('cart-actions');

            const clearAllButton = document.createElement('button');
            clearAllButton.textContent = 'Очистить все';
            clearAllButton.classList.add('clear-all-button');
            clearAllButton.addEventListener('click', clearAllSelections);

            cartActionsDiv.appendChild(clearAllButton);

            const checkoutButton = document.getElementById('checkout-button');

            if (checkoutButton) {
                cartActionsDiv.appendChild(checkoutButton);

                checkoutButton.addEventListener('click', function() {
                    vkBridge.send("VKWebAppGetUserInfo", {})
                        .then(data => {
                            const userId = data.id; // Получаем ID пользователя

                            const orderDetails = {
                                products: selectedProducts,
                                totalPrice: totalPrice,
                                userId: userId // Используем полученный ID пользователя
                            };

                            fetch('http://lovegamesv.temp.swtest.ru/checkout.php', { // Ваш URL
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(orderDetails)
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.response) {
                                    alert("Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.");
                                } else {
                                    alert("Не удалось отправить подтверждение заказа.");
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert("Произошла ошибка при отправке заказа.");
                            });
                        })
                        .catch(error => {
                            console.error("Error getting user info:", error);
                            alert("Не удалось получить информацию о пользователе. Пожалуйста, попробуйте позже.");
                        });
                });
            }

            selectedProductsDiv.appendChild(cartActionsDiv);
        }
    }

    showStep(currentStep);
    updateProgress();
    updateNextButtonText();
    updatePrevButtonState();
});
