// Получаем ссылку на кнопку "Общий каталог"
const catalogButton = document.querySelector('.catalog-button');

// Добавляем обработчик события на наведение мыши (mouseover)
catalogButton.addEventListener('mouseover', () => {
  // Меняем текст кнопки на "Открыть каталог"
  catalogButton.textContent = 'Открыть каталог';
});

// Добавляем обработчик события на уход мыши (mouseout)
catalogButton.addEventListener('mouseout', () => {
  // Возвращаем исходный текст кнопки "Общий каталог"
  catalogButton.textContent = 'Общий каталог';
});
