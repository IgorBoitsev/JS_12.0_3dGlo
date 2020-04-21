`use strict`;

let hello = document.getElementById('hello'),
    day = document.getElementById('day'),
    currentTime = document.getElementById('current-time'),
    closeToNY = document.getElementById('close-to-ny'),
    startStop = document.getElementById('start-stop'),
    reset = document.getElementById('reset'),
    animation = document.querySelector('.animation'),
    ny = new Date(`1 janaury 2021`),
    today = new Date(),
    week = {
      0 : `Воскресенье`,
      1 : `Понедельник`,
      2 : `Вторник`,
      3 : `Среда`,
      4 : `Четверг`,
      5 : `Пятница`,
      6 : `Суббота`,
    },
    status = {
      dayTime : ``,
      dayName : ``,
      time : ``,
      daysToNY : ``
    };

// Определение времени суток
if (today.getHours() > 5 && today.getHours() < 12) {
  status.dayTime = `Доброе утро!`;
}
if (today.getHours() >= 12 && today.getHours() < 18) {
  status.dayTime = `Добрый день!`;
}
if (today.getHours() >= 18 && today.getHours() < 22) {
  status.dayTime = `Добрый вечер!`;
}
if (today.getHours() <= 5 || today.getHours() >= 22) {
  status.dayTime = `Доброй ночи!`;
}

// Определение дня недели
switch (today.getDay()) {
  case 0 : status.dayName = week[today.getDay()];
  break;
  case 1 : status.dayName = week[today.getDay()];
  break;
  case 2 : status.dayName = week[today.getDay()];
  break;
  case 3 : status.dayName = week[today.getDay()];
  break;
  case 4 : status.dayName = week[today.getDay()];
  break;
  case 5 : status.dayName = week[today.getDay()];
  break;
  case 6 : status.dayName = week[today.getDay()];
  break;
};

// Определение текущего времени
status.time = today.toLocaleTimeString(`en`);

// Определене количества дней до НГ
status.daysToNY = Math.ceil((ny.getTime() - today.getTime()) / 86400000);

// Заполнение документа
hello.textContent = status.dayTime;
day.textContent = `Сегодня: ${status.dayName}`;
currentTime.textContent = `Текущее вермя: ${status.time}`;
closeToNY.textContent = `До нового года осталось ${status.daysToNY} дней!`;

// Анимация
let play = false;
let stick;

function stickers() {
  play = !play;
 
  if (play) {
    stick = requestAnimationFrame(stickers);
    let img = document.createElement('img'),
        i = Math.floor(Math.random() * (11 - 1) + 1),
        maxWidth = getComputedStyle(document.body).width.substr(0, 3),
        maxHeight = getComputedStyle(document.body).height.substr(0, 3),
        posTop = Math.floor(Math.random() * maxHeight),
        posLeft = Math.floor(Math.random() * maxWidth);

    img.src = `./images/animation/${i}.png`;
    img.style.cssText = `position: absolute; top: ${posTop}; left: ${posLeft}`;

    animation.append(img);
  }
}


startStop.addEventListener('click', () => {
  stickers();
});

reset.addEventListener('click', () => {
  // Очитска окна
  play = false;
});


