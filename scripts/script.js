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
  timeLeft(`22 april 2020`);

  // let deadline24Hours = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

  // timeLeft(deadline24Hours);
  
  // console.log(new Date().getTime() + 1000 * 60 * 60 * 24);
})