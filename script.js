document.addEventListener('DOMContentLoaded', function() {
  // Получаем все элементы подменю
  const submenus = document.querySelectorAll('.submenu');

  // Добавляем обработчик клика к каждому элементу меню, у которого есть подменю
  const menuItemsWithSubmenus = document.querySelectorAll('.menu-item.has-submenu');
  menuItemsWithSubmenus.forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault(); // Предотвращаем переход по ссылке

      // Закрываем все открытые подменю
      submenus.forEach(submenu => {
        if (submenu !== this.querySelector('.submenu')) {
          submenu.classList.remove('active');
        }
      });

      // Открываем или закрываем текущее подменю
      const submenu = this.querySelector('.submenu');
      submenu.classList.toggle('active');
    });
  });

  // Закрываем подменю при клике за пределами меню
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.menu')) {
      submenus.forEach(submenu => {
        submenu.classList.remove('active');
      });
    }
  });
});
