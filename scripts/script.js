document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds'),
      timerNumbers = document.querySelector('.timer-numbers'),
      month = {
        0 : `january`,
        1 : `february`,
        2 : `march`,
        3 : `april`,
        4 : `may`,
        5 : `june`,
        6 : `july`,
        7 : `august`,
        8 : `september`,
        9 : `november`,
        10 : `october`,
        11 : `december`
      };

  function timeLeft(deadline) {
 
    function getTimeRemaining() {
      let dateStart = new Date().getTime(),
          dateStop = new Date(deadline).getTime(),          
          timeRemaining = (dateStop - dateStart) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      let timer = getTimeRemaining();
      
      if (timer.timeRemaining < 0) {
        timerNumbers.style.color = `red`;
        timer.hours = `00`;
        timerHours.textContent = timer.hours;
        timer.minutes = `00`;
        timerMinutes.textContent = timer.minutes;
        timer.seconds = `00`;
        timerSeconds.textContent = timer.seconds;
        clearInterval(updClk);
      } else {
          timer.hours < 10 ? timerHours.textContent = `0${timer.hours}` : timerHours.textContent = timer.hours;
          timer.minutes < 10 ? timerMinutes.textContent = `0${timer.minutes}` : timerMinutes.textContent = timer.minutes;
          timer.seconds < 10 ? timerSeconds.textContent = `0${timer.seconds}` : timerSeconds.textContent = timer.seconds;
      }
    }
    let updClk = setInterval(updateClock, 1000);
  }

  // Таймер с конкретной датой
  // timeLeft(`22 april 2020`);

  // Таймер отсчитывает 
  let deadline24Hours = `${new Date().getDate() + 1} ${month[new Date().getMonth()]} ${new Date().getFullYear()}`;
  timeLeft(deadline24Hours);

  // Меню
  const toggleMenu = () => {
    const menuBtn = document.querySelector(`.menu`),
          closeBtn = document.querySelector(`.close-btn`),
          menu = document.querySelector(`menu`),
          menuItems = menu.querySelectorAll(`ul > li`);
    const showMenu = () => {

      // ----------------------------------------------------------------------------
      // if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
      //   menu.style.transform = `translate(0)`;
      // } else {
      //     menu.style.transform = `translate(-100%)`;
      // }
      // ----------------------------------------------------------------------------

      menu.classList.toggle(`active-menu`);
    };       
    
    menuBtn.addEventListener('click', showMenu);
    closeBtn.addEventListener(`click`, showMenu);

    menuItems.forEach((item) => item.addEventListener(`click`, showMenu));
  };
  toggleMenu();

  // popup
  const showPopup = () => {
    const popup = document.querySelector(`.popup`),
          popupClose = document.querySelector(`.popup-close`),
          popupBtn = document.querySelectorAll(`.popup-btn`);
    let opacity;
    
    const popupAppearance = function() {
      opacity = requestAnimationFrame(popupAppearance);
     
      if (popup.style.opacity < 1) {
        popup.style.opacity = +popup.style.opacity + 0.05;
      } else {
        cancelAnimationFrame(opacity);
      }
    };

    popupBtn.forEach((item) => {
      item.addEventListener(`click`, () => {
        popup.style.opacity = 0;
        popup.style.display = `block`;
        opacity = requestAnimationFrame(popupAppearance);
       
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = `none`;
    });
  };
  showPopup();

  // scroll
  const scroll = () => {
    const scrollDown = document.getElementById(`scroll-down`);
    
          
  };
  scroll();
})