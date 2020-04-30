class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== `button` &&
             item.type !== `button`;
    });
    this.error = new Set();
  }

  init() {
    // Добавление стилей для полей в head страницы
    this.applyStyle();
    // Установка пользовательских шаблонов
    this.setPattern();
    // Добавление обработчиков событий на отобранные из формы кнопки
    this.elementsForm.forEach(elem => elem.addEventListener(`change`, this.checkIt().bind(this)));
    // 
    this.form.addEventListener(`submit`, (event) => {
      event.preventDefault();
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size)
        event.preventDefault();
    });
  }

  // 
  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === ``) {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) []
    const method = this.method[elem.id];

    if (method) {
      return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
    }

    return true;
  }

  // Проверка на валидность
  checkIt(event) {
    if (this.isValid(event.target)) {
      this.showSuccess(event.target);
      this.error.delete(event.target);
    } else {
        this.showError(event.target);
        this.error.add(event.target);
    }
  }

  // Обнаружение ошибки в поле ввода данных
  showError(elem) {
    // Добавление класса полю с ошибкой
    elem.classList.remvoe(`success`);
    elem.classList.add(`error`);
    // Сообщение об ошибке
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains(`.validator-error`)) {
      return;
    }
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
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains(`.validator-error`)) {
      elem.nextElementSibling.remove();
    }
  }
  
  applyStyle() {
    const style = document.createElement(`style`);
    style.textContent = `input.success {
                           outline: 2px solid green;
                         }
                         input.error {
                           outline: 2x solid red;
                         }
                         .validator-error {
                           font-size: 12px;
                           font-family: sans-serif;
                           dolor: red;
                         }`;
    document.head.appendChild(style);
  }

  setPattern() {

    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}