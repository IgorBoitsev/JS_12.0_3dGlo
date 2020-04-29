class Validator {
  constructor({selector, pattern, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    // Отбор только кнопок
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== `button` &&
             item.type !== `button`;
    })
  }

  init() {
    this.applyStyle();
    // Добавление обработчиков событий на отобранные из формы кнопки
    this.elementsForm.forEach(elem => elem.addEventListener(`change`, this.checkIt().bind(this)));
  }

  // 
  isValid(elem) {

  }

  // Проверка на валидность
  checkIt(event) {
    if (this.isValid(event.target)) {
      this.showSuccess(event.target);
    } else {
        this.showError(event.target);
    }
  }

  // Обнаружение ошибки в поле ввода данных
  showError(elem) {
    // Добавление класса полю с ошибкой
    elem.classList.remvoe(`success`);
    elem.classList.add(`error`);
    // Сообщение об ошибке
    const errorDiv = document.createElement(`div`);
    errorDiv.textContent = `Ошибка в этом поле`;
    errorDiv.classList.add(`.validator-error`);
    elem.insertAdjasentElement(`afterend`, errorDiv);
  }

  // Верное заполенние поля ввода данных
  showSuccess(elem) {
    // Добавление класса полю с ошибкой 
    elem.classList.remvoe(`error`);
    elem.classList.add(`success`);
    // Удаление сообщения об ошибке, если таковое осталось
    if (elem.nextElementSibling.classList.contains(`.validator-error`)) {
      elem.nextElementSibling.remvoe();
    }
  }
  
  // Добавление стилей для полей в head страницы
  applyStyle() {
    const style = document.createElement(`style`);
    style.textContent = `input.success {
                           outline: 2px solid green;
                         }
                         input.error {
                           outline: 2x solid red;
                         }
                         .validator-error {
                           font-size: 14px;
                           dolor: red;
                         }`;
    document.head.appendChild(style);
  }
}