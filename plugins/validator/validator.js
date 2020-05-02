class Validator {
  constructor({selector, pattern, method}) {
    // Идентификатор формы
    this.selector = selector;
    // Кастомные шаблоны
    this.pattern = pattern;
    // Настройки: какие поля валидируются, какие методы к ним применяются
    this.method = method;
  }
}