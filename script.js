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
    const checkoutButton = document.getElementById('checkout-button');

    let currentStep = 1;
    let selectedProducts = [];
    let totalPrice = 0;
    let productsData = {}; // Объект для хранения данных о товарах
    let selectedCategories = {}; // Объект для хранения выбранных категорий на каждом шаге
    let currentSort = { by: null, order: 'asc' }; // Track current sorting

    // Данные о товарах
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
            { name: 'Наполнитель из перьев 5', image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 6', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 7', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 8', price: 150, image: 'placeholder.jpg' },
            { name: 'Наполнитель из перьев 9', price: 150, image: 'placeholder.jpg' }
        ],
        'step4-kraft-plain': [
            { name: 'Крафтовая бумага без цвета', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 2', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 3', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 4', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 5', image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 6', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 7', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 8', price: 60, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага без цвета 9', image: 'placeholder.jpg' }
        ],
        'step4-kraft-print': [
            { name: 'Крафтовая бумага с принтом', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 2', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 3', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 4', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 5', image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 6', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 7', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 8', price: 80, image: 'placeholder.jpg' },
            { name: 'Крафтовая бумага с принтом 9', image: 'placeholder.jpg' }
        ],
        'step4-wrapping-paper': [
            { name: 'Оберточная бумага с принтом', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 2', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 3', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 4', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 5', image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 6', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 7', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 8', price: 90, image: 'placeholder.jpg' },
            { name: 'Оберточная бумага с принтом 9', image: 'placeholder.jpg' }
        ],
        'step5-mini-card': [
            { name: 'Мини открытка', price: 0, image: 'placeholder.jpg' }
        ],
        'step5-mini-design': [
            { name: 'Мини открытка с дизайном', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 2', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 3', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 4', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 5', image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 6', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 7', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 8', price: 50, image: 'placeholder.jpg' },
            { name: 'Мини открытка с дизайном 9', image: 'placeholder.jpg' }
        ],
        'step5-3d-card': [
            { name: 'Открытка с 3D разворотом', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 2', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 3', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 4', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 5', image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 6', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 7', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 8', price: 100, image: 'placeholder.jpg' },
            { name: 'Открытка с 3D разворотом 9', image: 'placeholder.jpg' }
        ],
        'step5-audio-card': [
            { name: 'Аудио открытка', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 2', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 3', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 4', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 5', image: 'placeholder.jpg' },
            { name: 'Аудио открытка 6', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 7', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 8', price: 150, image: 'placeholder.jpg' },
            { name: 'Аудио открытка 9', image: 'placeholder.jpg' }
        ],
        'step6-no-scent': [
            { name: 'Без запаха', price: 0, image: 'placeholder.jpg' }
        ],
        'step6-fruity-floral': [
            { name: 'Аромат фруктово-цветочный', price: 0, image: 'placeholder.jpg' }
        ],
        'step6-woody-fruity': [
            { name: 'Аромат древесно-фруктовый', price: 0, image: 'placeholder.jpg' }
        ],
        'step6-woody-floral': [
            { name: 'Аромат древесные цветочные', price: 0, image: 'placeholder.jpg' }
        ],
        'step6-woody-musky': [
            { name: 'Аромат древесные мускусные', price: 0, image: 'placeholder.jpg' }
        ]
    };

    // Инициализация productsData
    productsData = products;

    // Загрузка начальных продуктов для первого шага
    loadProducts(currentStep);

    // Функция для обновления прогресс-бара и отображения шага
    function updateProgress() {
        const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        currentStepDisplay.textContent = currentStep;
    }

    // Функция для скрытия всех шагов
    function hideAllSteps() {
        steps.forEach(step => {
            step.style.display = 'none';
        });
    }

    // Функция для отображения текущего шага
    function showStep(stepNumber) {
        hideAllSteps();
        const stepElement = document.getElementById(`step${stepNumber}`);
        stepElement.style.display = 'block';
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        document.querySelector('.progress-container').style.display = stepNumber === 7 ? 'none' : 'block';

        updateActiveCategoryHighlighting();
        selectedProductsDiv.style.display = selectedProducts.length > 0 ? 'block' : 'none';
    }

    // Функция для загрузки продуктов на основе выбранной категории
    function loadProducts(stepNumber, category = null) {
        const productsDiv = productsDivs[stepNumber - 1];
        productsDiv.innerHTML = '';

        let productsToDisplay = category ? productsData[`step${stepNumber}-${category}`] || [] : 
            Object.values(productsData).filter(p => p.key.startsWith(`step${stepNumber}-`)).flat();

        productsToDisplay.sort((a, b) => a.price - b.price);

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
            productPriceDiv.textContent = product.price === 0 ? 'Бесплатно' : `${product.price} рублей`;
            productInfoDiv.appendChild(productPriceDiv);

            productDiv.appendChild(productInfoDiv);

            const selectButton = document.createElement('button');
            selectButton.classList.add('select-button');
            selectButton.textContent = isProductSelected(product) ? `Удалить (${getProductQuantity(product)})` : `Выбрать`;
            selectButton.dataset.name = product.name;
            selectButton.dataset.price = product.price;
            productDiv.appendChild(selectButton);

            productsDiv.appendChild(productDiv);
        });

        // Добавляем обработчики событий для кнопок выбора
        productsDiv.querySelectorAll('.select-button').forEach(button => {
            button.addEventListener('click', selectProduct);
        });
    }

    // Функция для проверки, выбран ли продукт
    function isProductSelected(product) {
        return selectedProducts.some(p => p.name === product.name);
    }

    // Функция для получения количества выбранного продукта
    function getProductQuantity(product) {
        const selectedProduct = selectedProducts.find(p => p.name === product.name);
        return selectedProduct ? selectedProduct.quantity : 0;
    }

    // Функция для обработки выбора продукта
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

    // Функция для удаления продукта из списка выбранных
    function removeProductFromSelected(index) {
        selectedProducts.splice(index, 1);
        updateSelectedProductsDisplay();
        loadProducts(currentStep);
    }

    // Функция для обновления отображения выбранных продуктов
    function updateSelectedProductsDisplay() {
        selectedProductsList.innerHTML = '';
        totalPrice = 0;

        if (selectedProducts.length > 0) {
            selectedProductsDiv.style.display = 'block';

            selectedProducts.forEach(product => {
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
                productPriceDiv.textContent = product.price === 0 ? 'Бесплатно' : `${product.price} рублей`;
                selectedProductDiv.appendChild(productPriceDiv);

                selectedProductsList.appendChild(selectedProductDiv);
                totalPrice += product.price * product.quantity;
            });

            totalPriceDisplay.textContent = totalPrice;
        } else {
            selectedProductsDiv.style.display = 'none';
            totalPriceDisplay.textContent = '0';
        }
    }

    // Функция для обновления активного выделения категории
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

    // Обработчики событий для кнопок категорий
    document.querySelectorAll('.category-buttons button').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            selectedCategories[currentStep] = category;

            if (category === 'no-filler' || category === 'no-wrapping' || category === 'no-card' || category === 'no-scent') {
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                    updateProgress();
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

    // Начальная настройка
    showStep(currentStep);
    updateProgress();
});
