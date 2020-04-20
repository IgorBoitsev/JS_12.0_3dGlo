document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds'),
      timerNumbers = document.querySelector('.timer-numbers');

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
        timerHours = `00`;
        timerMinutes = `00`;
        timerSeconds = `00`;
      } else {
          timer.hours < 10 ? timerHours.textContent = `0${timer.hours}` : timerHours.textContent = timer.hours;
          timer.minutes < 10 ? timerMinutes.textContent = `0${timer.minutes}` : timerMinutes.textContent = timer.minutes;
          timer.seconds < 10 ? timerSeconds.textContent = `0${timer.seconds}` : timerSeconds.textContent = timer.seconds;
          
          setTimeout(updateClock, 1000);
      }
    }
    updateClock();
  }
  // Таймер с конкретной датой
  timeLeft('21 april 2020');

  // Таймер с отсроком в 24 часа
  let timeFrom = ``,
      timeTill = 
  // timeLeft();
})