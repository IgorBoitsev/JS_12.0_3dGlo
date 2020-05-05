document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds'),
      timerNumbers = document.querySelector('.timer-numbers'),
      month = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`,
              `september`, `november`, `october`, `december`];
  
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

  // Таймер отсчитывает сутки (календарные)
  let deadline24Hours = `${new Date().getDate() + 1} ${month[new Date().getMonth()]} ${new Date().getFullYear()}`;
  timeLeft(deadline24Hours);

  // Меню
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

    popup.addEventListener(`click`, (event) => {
      if (!event.target.closest(`.popup-content`) ||
          event.target.closest(`.popup-close`))
        popup.style.display = `none`;
    });
  };
  showPopup();

  // Прокрутка до нужного якоря
  // const scrolling = () => {
  //   const scrollDownBtn = document.getElementById(`scroll-down`),
  //         menu = document.querySelector(`menu`),
  //         menuItems = menu.querySelectorAll(`ul > li`);
    

  //   menuItems.forEach((item) => {
  //     // Получение id блока, до которого нужно скролить
  //     let elemToScroll = item.querySelector(`a`).getAttribute(`href`).substr(1),
  //         elemToScrollHeight = document.getElementById(`${elemToScroll}`).getBoundingClientRect().top,
  //         scroll;

  //     const scrollToId = function() {
  //       scroll = requestAnimationFrame(scrollToId);
  //       if (elemToScrollHeight > 0) {
  //         window.scrollBy(0, 1);
  //         elemToScrollHeight--;
  //       }
  //       if (elemToScrollHeight < 0) {
  //         window.scrollBy(0, -1);
  //         elemToScrollHeight++;
  //       }
  //       if (elemToScrollHeight === 0) {
  //         cancelAnimationFrame(scroll);
  //       }
        
  //     }

  //     item.addEventListener(`click`, () => {
  //       requestAnimationFrame(scrollToId);
  //     })
  //   });

  //   let scrollToServiceBlock,
  //       heigthToBlock = document.getElementById(`service-block`).getBoundingClientRect().top;
  //   const scrollDown = function() {
  //     scrollToServiceBlock = requestAnimationFrame(scrollDown);
  //     window.scrollBy(0, 1);
  //     heigthToBlock--;
  //   };

  //   scrollDownBtn.addEventListener(`click`, () => {
  //     heigthToBlock = document.getElementById(`service-block`).getBoundingClientRect().top;

  //     if (heigthToBlock > 0) {
  //       requestAnimationFrame(scrollDown);
  //     } else {
  //       cancelAnimationFrame(scrollDown);
  //     }
  //   });
  // };
  // scrolling();

  // Раскрытые вкладок (табы)
  const tabs =() => {
    const tabHeader = document.querySelector(`.service-header`),
          tab = tabHeader.querySelectorAll(`.service-header-tab`),
          tabContent = document.querySelectorAll(`.service-tab`);
    
    // Смена классов
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add(`active`);
          tabContent[i].classList.remove(`d-none`);
        } else {
            tab[i].classList.remove(`active`);
            tabContent[i].classList.add(`d-none`);
        }
      }
    };

    // Отлавливание клика по элементу
    tabHeader.addEventListener(`click`, (event) => {
      let target = event.target;

      target = target.closest(`.service-header-tab`);
      if (target) {
        tab.forEach((item, index) => {
          if(item === target) toggleTabContent(index);
        });
      }
    });
  };
  tabs();

  // Слайдер
  const slider = () => {
    const slide = document.querySelectorAll(`.portfolio-item`),
          slider = document.querySelector(`.portfolio-content`);

    const portfolioDots = document.querySelector(`.portfolio-dots`);

    for (let i = 0; i < slide.length; i++) {
      portfolioDots.insertAdjacentHTML(`beforeend`, `<li class="dot"></li>`);
    }
    const dot = document.querySelectorAll(`.dot`);
    dot[0].classList.add(`dot-active`);


    let currentSlide = 0,
        interval;
    
    const prevSlide = (listOfElems, index, strClass) => listOfElems[index].classList.remove(strClass);
    const nextSlide = (listOfElems, index, strClass) => listOfElems[index].classList.add(strClass);

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, `portfolio-item-active`);
      prevSlide(dot, currentSlide, `dot-active`);
      currentSlide++;

      if (currentSlide >= slide.length) currentSlide = 0;
      nextSlide(slide, currentSlide, `portfolio-item-active`);
      nextSlide(dot, currentSlide, `dot-active`);
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    }

    slider.addEventListener(`click`, (event) => {
      event.preventDefault();

      if (!event.target.matches(`.portfolio-btn, .dot`)) return;
      
      prevSlide(slide, currentSlide, `portfolio-item-active`);
      prevSlide(dot, currentSlide, `dot-active`);

      if (event.target.matches(`#arrow-right`)) {
        currentSlide++;
      } else if (event.target.matches(`#arrow-left`)) {
        currentSlide--;
      } else if (event.target.matches(`.dot`)) {
        dot.forEach((item, index) => {
          if (item === event.target)  currentSlide = index;
        })
      }

      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;

      nextSlide(slide, currentSlide, `portfolio-item-active`);
      nextSlide(dot, currentSlide, `dot-active`);
    });

    slider.addEventListener(`mouseover`, (event) => {
      if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`))
        stopSlide()
    });

    slider.addEventListener(`mouseout`, (event) => {
      if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`))
        startSlide()
    });
    
    startSlide(3000);
  };
  slider();

  // Наша команда
  const imageChanger = () => {
    const command = document.getElementById(`command`),
          commandPhoto = command.querySelectorAll(`.command__photo`);

    commandPhoto.forEach((item) => {
      item.addEventListener(`mouseenter`, () => {
        const src = item.src;
        item.src = item.dataset.img;

        item.addEventListener(`mouseleave`, () => {
          item.src = src;
        });
      });
    });
  };
  imageChanger();

  // Калькулятор
  const calcItems = document.querySelectorAll(`.calc-item`);

  calcItems.forEach((item) => {
    item.addEventListener(`input`, () => {
      item.value = item.value.replace(/\D/g, '');
    });
  });

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(`.calc-block`),
          calcType = document.querySelector(`.calc-type`),
          calcSquare = document.querySelector(`.calc-square`),
          calcCount = document.querySelector(`.calc-count`),
          calcDay = document.querySelector(`.calc-day`),
          totalValue = document.getElementById(`total`);

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1,
          totalBar = 0;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
      
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      } else if (calcCount.value == `0`) {
          countValue = 0;
      }

      if (calcDay.value == `0`) {
        dayValue = 0;
      } else if (calcDay.value && calcDay.value < 5) {
          dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
          dayValue *= 1.5;
      }


      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
       

        // Обнуление исходного значения для заполнения итогового поля
        totalValue.textContent = 0;
        
        // Отключение полей, пока калькулятор считает
        calcType.setAttribute(`disabled`, true);
        calcSquare.setAttribute(`disabled`, true);
        calcCount.setAttribute(`disabled`, true);
        calcDay.setAttribute(`disabled`, true);


        let totalAmount = setInterval(() => {

          if (total - totalBar > 1000) {
            totalValue.textContent = totalBar;
            totalBar += 1000;
          } else if (total - totalBar <= 10000 && total - totalBar >= 0) {
              totalValue.textContent = totalBar;
              totalBar += 100;
          } else if (total - totalBar < 100 && total - totalBar >= 0) {
              totalValue.textContent = totalBar;
              totalBar++;
          } else {
              clearInterval(totalAmount);
              
              // Возобновление возможности ввода данных в поля
              calcType.removeAttribute(`disabled`);
              calcSquare.removeAttribute(`disabled`);
              calcCount.removeAttribute(`disabled`);
              calcDay.removeAttribute(`disabled`);
          }
        }, 100);
      } else {
          totalValue.textContent = total;
          return;
      }
    };

    calcBlock.addEventListener(`change`, (event) => {
      if (event.target === calcType || event.target === calcSquare ||
          event.target === calcDay || event.target === calcCount) {
        countSum();
      }
    });

  };
  calc(1000);

  // ================================================
  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    
    const formTop = document.getElementById('form1'),
          formBottom = document.getElementById('form2'),
          formPop = document.getElementById('form3'),
          // Получение всех форм
          forms = document.querySelectorAll('form');

    // Запрет ввода символов кроме цифр и +
    document.getElementsByName('user_phone').forEach(item => {
      item.addEventListener('input', () => item.value = item.value.replace(/[^+0-9]/, ''))
    });

    // Запрет ввода символов кроме кириллицы и пробелов
    document.getElementsByName('user_name').forEach(item => {
      item.addEventListener('input', () => item.value = item.value.replace(/[\w\d\-\=\.\,]/, ''))
    });

    // Поле для текстового уведомления под формой
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #ffffff';

    forms.forEach(item => {
      item.addEventListener('submit', (event) => {
        event.preventDefault();
        // Вставка уведомления о результате
        item.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        // Получение данных из формы
        const formData = new FormData(item);
        let body = {};
        formData.forEach((val, key) => body[key] = val);
        postData(body, () => {
          statusMessage.textContent = successMessage;
        }, (error) => {
          statusMessage.textContent = errorMessage;
          console.log(error);
        });
        // Очистка полей ввода
        item.querySelectorAll('input').forEach(elem => elem.value = '');
      });
    });

    const postData = (body, outputData, errorData) => {
      // Запрос к серверу
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4)  return;
        
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      // Отправка полученных данных на сервер
      request.send(JSON.stringify(body));
    };
  };
  sendForm();
})