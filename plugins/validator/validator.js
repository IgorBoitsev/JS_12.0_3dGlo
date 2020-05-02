class Validator {
  constructor({selector, pattern = {}, method}) {
    // Идентификатор формы
    this.form = document.querySelector(selector);
    // Кастомные шаблоны
    this.pattern = pattern;
    // Настройки: какие поля валидируются, какие методы к ним применяются
    this.method = method;
    // Отобранные из формы поля для ввода данных (без кнопок)
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !=='button';
    });
    // Коллекция ошибок
    this.error = new Set();
  }

  // Инициализация валидатора
  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(item => item.addEventListener('change', this.checkIt.bind(this)));
    
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size)
        event.preventDefault();
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') return false;
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    if (this.method) {
      const method = this.method[elem.name];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]))
      }
    } else {
        console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }

    return true;
  }

  // 
  checkIt() {
    if (this.isValid(event.target)) {
      this.showSuccess(event.target);
      this.error.delete(event.target);
    } else {
        this.showError(event.target);
        this.error.add(event.target);
    }
  }

  // Обнаружение ошибок валидации
  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    
    // Проверка наличия сообщения об ошибке для предотвращения ее повторного отображения
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error'))
      return;

    // Вывод сообщения об ошибке
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  // Успешное прохождение валидации
  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    // Удаления сообщения об ошибке у соседних элементов
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error'))
      elem.nextElementSibling.remove();
  }

  // Создание стилей для оформления внешнего вида
  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `.main-form .success,
                          .footer-form-input .row .success {
                           border: 2px solid green
                         }
                         .main-form .error,
                         .footer-form-input .row .error {
                           border: 2px solid red
                         }
                         .main-form .validator-error,
                         .footer-form-input .row .validator-error {
                           font-size: 12px;
                           font-family: sans-serif;
                           color: red;
                         }`;
    document.head.appendChild(style);
  }

  // Установка шаблонов
  setPattern() {
    if (!this.pattern.user_name)
      this.pattern.user_name = /^\W+$/;
    
    if (!this.pattern.user_phone)  
      this.pattern.user_phone = /^\+?[78]([-()]*\d){10}$/;

    if (!this.pattern.user_email)
      this.pattern.user_email = /^\w+\.?\w+?@\w+\.\w{2,}$/;

    if (!this.pattern.user_message)
    this.pattern.user_message = /^\W+$/;
  }
}