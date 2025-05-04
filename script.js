const catalogButton = document.querySelector('.catalog-button');
const dropdown = document.querySelector('.dropdown');
let isDropdownOpen = false;
const defaultText = "Общий каталог";
const openText = "Подборки";

// Функция для открытия/закрытия дропдауна
function toggleDropdown(event) {
    isDropdownOpen = !isDropdownOpen;
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = isDropdownOpen ? 'block' : 'none';
    catalogButton.textContent = isDropdownOpen ? openText : defaultText;

    // Предотвращаем переход по ссылке, если это первый клик
    if (isDropdownOpen) {
        event.preventDefault();
    }
}

// Обработчик клика для мобильных устройств
catalogButton.addEventListener('click', (event) => {
    toggleDropdown(event);
});

// Обработчик наведения мыши для устройств с поддержкой hover
if (window.matchMedia("(hover: hover)").matches) {
    dropdown.addEventListener('mouseenter', () => {
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.style.display = 'block';
        catalogButton.textContent = openText;
    });

    dropdown.addEventListener('mouseleave', () => {
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.style.display = 'none';
        catalogButton.textContent = defaultText;
    });
}
