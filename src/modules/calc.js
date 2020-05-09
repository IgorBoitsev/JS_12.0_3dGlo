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