import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '../utils/validation';

export const REGISTER_FIELDS = [
  {
    placeholder: 'Почта',
    name: 'email',
    type: 'email',
    validate: validateEmail,
  },
  {
    placeholder: 'Логин',
    name: 'login',
    type: 'text',
    validate: validateLogin,
  },
  {
    placeholder: 'Имя',
    name: 'first_name',
    type: 'text',
    validate: validateName,
  },
  {
    placeholder: 'Фамилия',
    name: 'second_name',
    type: 'text',
    validate: validateName,
  },
  {
    placeholder: 'Телефон',
    name: 'phone',
    type: 'telephone',
    validate: validatePhone,
  },
  {
    placeholder: 'Пароль',
    name: 'password',
    type: 'password',
    validate: validatePassword,
  },
  {
    placeholder: 'Пароль (ещё раз)',
    name: 'confirm_password',
    type: 'password',
    validate: (value = '') => {
      const password = document.querySelector(
        'input[name="password"]'
      ) as HTMLInputElement;
      if (password.value !== value) {
        return 'Пароли не совпадают';
      }

      return true;
    },
  },
];

export const LOGIN_FIELDS = [
  {
    placeholder: 'Логин',
    name: 'login',
    type: 'text',
    validate: validateLogin,
  },
  {
    placeholder: 'Пароль',
    name: 'password',
    type: 'password',
    validate: validatePassword,
  },
];
