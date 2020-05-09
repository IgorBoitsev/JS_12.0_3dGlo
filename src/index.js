'use strict';

import timeLeft from './modules/timeLeft';
import toggleMenu from './modules/toggleMenu';
import showPopup from './modules/showPopup';
// import scrolling from './modules/scrolling';
import tabs from './modules/tabs';
import slider from './modules/slider';
import imageChanger from './modules/imageChanger';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Обратный отсчет времени
timeLeft();
// Появление меню
toggleMenu();
// popup
showPopup();
// Прокрутка до нужного якоря
// scrolling();
// Раскрытые вкладок (табы)
tabs();
// Слайдер
slider();
// Наша команда
imageChanger();
// Калькулятор
calc(1000);
// send-ajax-form
sendForm();