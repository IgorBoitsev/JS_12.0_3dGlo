const toggleMenu = () => {
  const menuBtn = document.querySelector(`.menu`),
        menu = document.querySelector(`menu`);
  
  // Варинат с двумя обработчиками событий
  menu.addEventListener(`click`, (event) => {
    console.log(event.target);
    if (event.target.closest(`li`) || event.target.closest(`.close-btn`)) {
      menu.classList.toggle(`active-menu`);
    }
  });
  menuBtn.addEventListener('click', () => menu.classList.toggle(`active-menu`));

  // Вариант с одним обработчиком события

};