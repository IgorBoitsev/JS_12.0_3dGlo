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
  
  // Обратный отсчет времени
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
        
        if (document.documentElement.clientWidth > 768) {
          popup.style.opacity = 0;
          popup.style.display = `block`;
          requestAnimationFrame(popupAppearance);
        } else {
            popup.style.display = `block`;
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = `none`;
    });
  };
  showPopup();

  // scroll
  const scrolling = () => {
    const scrollDownBtn = document.getElementById(`scroll-down`),
          menu = document.querySelector(`menu`),
          menuItems = menu.querySelectorAll(`ul > li`);
    

    menuItems.forEach((item) => {
      // Получение id блока, до которого нужно скролить
      let elemToScroll = item.querySelector(`a`).getAttribute(`href`).substr(1),
          elemToScrollHeight = document.getElementById(`${elemToScroll}`).getBoundingClientRect().top,
          scroll;

      const scrollToId = function() {
        scroll = requestAnimationFrame(scrollToId);
        if (elemToScrollHeight > 0) {
          window.scrollBy(0, 1);
          elemToScrollHeight--;
        }
        if (elemToScrollHeight < 0) {
          window.scrollBy(0, -1);
          elemToScrollHeight++;
        }
        if (elemToScrollHeight === 0) {
          cancelAnimationFrame(scroll);
        }
        
      }

      item.addEventListener(`click`, () => {
        requestAnimationFrame(scrollToId);
      })
    });

    let scrollToServiceBlock,
        heigthToBlock = document.getElementById(`service-block`).getBoundingClientRect().top;
    const scrollDown = function() {
      scrollToServiceBlock = requestAnimationFrame(scrollDown);
      window.scrollBy(0, 1);
      heigthToBlock--;
    };

    scrollDownBtn.addEventListener(`click`, () => {
      heigthToBlock = document.getElementById(`service-block`).getBoundingClientRect().top;

      if (heigthToBlock > 0) {
        requestAnimationFrame(scrollDown);
      } else {
        cancelAnimationFrame(scrollDown);
      }
    });
    
          
  };
  scrolling();
})