const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  
  const formTop = document.getElementById('form1'),
        formBottom = document.getElementById('form2'),
        formPop = document.getElementById('form3'),
        // Получение всех форм
        forms = document.querySelectorAll('form');

  // Запрет ввода символов кроме цифр и +
  document.getElementsByName('user_phone').forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[^+0-9]/, ''))
  });

  // Запрет ввода символов кроме кириллицы и пробелов
  document.getElementsByName('user_name').forEach(item => {
    item.addEventListener('input', () => item.value = item.value.replace(/[\w\d\-\=\.\,]/, ''))
  });

  // Поле для текстового уведомления под формой
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #ffffff';

  forms.forEach(item => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      // Вставка уведомления о результате
      item.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      // Получение данных из формы
      const formData = new FormData(item);
      let body = {};
      formData.forEach((val, key) => body[key] = val);

      postData(body)
        .then((response) => {
          if (response.status !== 200)
            throw new Error('Ошибка 200');
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.log(error);
        })
        // Очистка полей ввода
        .finally(() => item.querySelectorAll('input').forEach(elem => elem.value = ''));
    });
  });

  // Переписанная с помощью fetch() функция
  const postData = (body) => {

    return fetch('./server.php', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
    });
  };
};