function timeLeft() {

  let timerHours = document.getElementById('timer-hours'),
  timerMinutes = document.getElementById('timer-minutes'),
  timerSeconds = document.getElementById('timer-seconds'),
  timerNumbers = document.querySelector('.timer-numbers'),
  month = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`,
          `september`, `november`, `october`, `december`];

  let deadline24Hours = `${new Date().getDate() + 1} ${month[new Date().getMonth()]} ${new Date().getFullYear()}`;

  function addZero(elem, value) {
    if (elem < 10)
      value.textContent = `0${elem}`;
    else
      value.textContent = elem;
  }

  function getTimeRemaining() {
    let dateStart = new Date().getTime(),
        dateStop = new Date(deadline24Hours).getTime(),          
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
      timerHours.textContent = `00`;
      timerMinutes.textContent = `00`;
      timerSeconds.textContent = `00`;
      clearInterval(updClk);
    } else {
        addZero(timer.hours, timerHours);
        addZero(timer.minutes, timerMinutes);
        addZero(timer.seconds, timerSeconds);
    }
  }
  let updClk = setInterval(updateClock, 1000);
};

export default timeLeft;