document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds'),
      timerNumbers = document.querySelector('.timer-numbers'),
      hello = document.getElementById('hello'),
      closeToNewYear = document.getElementById('close-to-new-year');

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

  // function displayTimeToNewYear() {
  //   let h = new Date().getHours(),
  //       status = {};

  //   h < 6 ? : status.

  //   console.log(status);
    
  // }

  // displayTimeToNewYear();
  // Таймер с конкретной датой
  timeLeft('21 april 2020');

  // console.log(new Date(`1 january 2021`));
})