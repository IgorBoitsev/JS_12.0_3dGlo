`use strict`;

let hello = document.getElementById('hello'),
    day = document.getElementById('day'),
    currentTime = document.getElementById('current-time'),
    closeToNY = document.getElementById('close-to-ny'),
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


console.log(status.time);

