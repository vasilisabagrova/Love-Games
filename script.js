const catalogButton = document.querySelector('.catalog-button');
const dropdown = document.querySelector('.dropdown');
let isDropdownOpen = false;
const defaultText = "Общий каталог";
const openText = "Подборки";
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownHeight = dropdownContent.scrollHeight; // Получаем полную высоту

// Функция для открытия/закрытия дропдауна
function toggleDropdown(event) {
    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
        dropdownContent.style.display = 'block'; // Показываем перед анимацией
        dropdownContent.style.maxHeight = dropdownHeight + 'px'; // Анимируем высоту
        catalogButton.textContent = openText;
        event.preventDefault(); // Предотвращаем переход по ссылке
    } else {
        dropdownContent.style.maxHeight = '0'; // Анимируем высоту обратно
        catalogButton.textContent = defaultText;
        // Задержка перед скрытием, чтобы анимация успела завершиться
        setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 300); // Время задержки должно соответствовать времени анимации
    }
}

// Обработчик клика для мобильных устройств
catalogButton.addEventListener('click', (event) => {
    toggleDropdown(event);
});

// Обработчик наведения мыши для устройств с поддержкой hover
if (window.matchMedia("(hover: hover)").matches) {
    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
        dropdownContent.style.maxHeight = dropdownHeight + 'px';
        catalogButton.textContent = openText;
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.style.maxHeight = '0';
        catalogButton.textContent = defaultText;
        setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 300);
    });
}
