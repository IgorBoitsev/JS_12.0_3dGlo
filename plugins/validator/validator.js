class Validator {
  constructor({selector, pattern, method}) {
    this.selector = selector;
    this.pattern = pattern;
    this.method = method;
  }

  init() {
    this.applyStyle();
  }

  showError(elem) {

  }

  showSuccess(elem) {

  }

  applyStyle() {
    const style = document.createElement(`style`);
    style.textContent = `input.success {
                           outline: 2px solid green;
                         }
                         input.error {
                           outline: 2x solid red;
                         }`
  }
}