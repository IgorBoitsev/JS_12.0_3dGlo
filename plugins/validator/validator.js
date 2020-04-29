class Validator {
  constructor({selector, pattern, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
  }

  init() {
    this.applyStyle();

    const
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

  // 
  showSuccess(elem) {
    // Добавление класса полю с ошибкой 
    elem.classList.remvoe(`error`);
    elem.classList.add(`success`);
    // Удаление сообщения об ошибке, если таковое осталось
    if (elem.nextElementSibling.classList.contains(`.validator-error`)) {
      elem.nextElementSibling.remvoe();
    }

  applyStyle() {
    const style = document.createElement(`style`);
    style.textContent = `input.success {
                           outline: 2px solid green;
                         }
                         input.error {
                           outline: 2x solid red;
                         }
                         validator-error {
                           font-size: 14px;
                           dolor: red;
                         }`
  }
}