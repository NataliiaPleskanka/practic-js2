// Якщо імейл і пароль користувача збігаються, зберігай дані з форми при сабміті
// у локальне сховище і змінюй кнопку Login на Logout і роби поля введення
// недоступними для змін.
// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити Logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці Logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.
// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../img/javascript.svg';

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const form = document.querySelector('.login-form');
const button = document.querySelector('.login-btn');
const email = document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");
const container = document.querySelector('.container');

function handleSubmit(event) {
  event.preventDefault();

  if (button.textContent === 'Logout') {
    form.reset();
    localStorage.removeItem('login-data');
    button.textContent = 'Login';
    email.removeAttribute('readonly');
    password.removeAttribute('readonly');
    container.classList.add('is-hidden');

    return;
  }
  // const { email, password } = event.target.elements
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (emailValue === '' || passwordValue === '') {
    iziToast.warning({ message: 'Заповніть всі поля!', iconUrl: icon });
    return;
  }
  if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
    // alert('Данні не співпадають!');
    iziToast.warning({ message: 'Дані не співпадають!' });
    return;
  }

  localStorage.setItem(
    'login-data',
    JSON.stringify({ email: emailValue, password: passwordValue })
  );
  button.textContent = 'Logout';

  email.setAttribute('readonly', true);
  password.setAttribute('readonly', true);

  iziToast.success({ message: 'Вітання, Ви залогінились!' });

  container.classList.remove('is-hidden');
}

const storageData = localStorage.getItem('login-data');

if (storageData) {
  const parseData = JSON.parse(storageData);
  button.textContent = 'Logout';
  email.setAttribute('readonly', true);
  password.setAttribute('readonly', true);
  email.value = parseData.email || '';
  password.value = parseData.password || '';
  container.classList.remove('is-hidden');
}

form.addEventListener('submit', handleSubmit);
