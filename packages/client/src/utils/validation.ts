export const min = (value: string, minLength: number) => {
  return value.length >= minLength;
};

export const max = (value: string, maxLength: number) => {
  return value.length <= maxLength;
};

export const length = (
  value = '',
  minLength = 1,
  maxLength = Number.MAX_SAFE_INTEGER
) => {
  return min(value, minLength) && max(value, maxLength);
};

export const isEmpty = (value: string | undefined) => {
  if (!value) {
    return true;
  }
  return value.trim() === '';
};

export const startsWithUppercase = (value: string) => {
  if (isEmpty(value)) {
    return false;
  }
  return value[0].toUpperCase() === value[0];
};

export const onlyLetters = (value: string, allowedChars: string[] = []) => {
  const RE = new RegExp(`^[A-Za-zА-я${allowedChars.join('')}]+$`);
  return RE.test(value);
};

export const onlyLatinLetters = (
  value: string,
  allowedChars: string[] = []
) => {
  const RE = new RegExp(`^[A-Za-z${allowedChars.join('')}]+$`);
  return RE.test(value);
};

export const hasNumber = (value: string) => {
  return /\d/.test(value);
};

export const isNumber = (value: string, allowedChars: string[] = []) => {
  const RE = new RegExp(`^[\\d${allowedChars.join('')}]+$`);
  return RE.test(value);
};

export const hasUppercase = (value: string) => {
  return /[A-Z]/.test(value);
};

export const validateName = (value = '') => {
  if (isEmpty(value)) {
    return 'Поле не может быть пустым';
  }

  if (!startsWithUppercase(value)) {
    return 'Поле должно начинаться с заглавной буквы';
  }

  if (!onlyLetters(value, ['\\-'])) {
    return 'Поле должно содержать только буквы';
  }

  return true;
};

export const validatePassword = (value = '') => {
  if (!length(value, 8, 40)) {
    return 'Пароль должен быть от 8 до 40 символов';
  }

  if (!hasNumber(value) || !hasUppercase(value)) {
    return 'Пароль должен содержать хотя бы одну цифру и заглавную букву';
  }

  return true;
};

export const validateLogin = (value = '') => {
  const allowedChars = ['\\-', '_'];

  if (!length(value, 3, 20)) {
    return 'Поле должно быть от 3 до 20 символов';
  }

  if (!onlyLatinLetters(value, [...allowedChars, '\\d'])) {
    return 'Поле должно содержать только латиницу и быть без спецсимволов';
  }

  if (isNumber(value, allowedChars)) {
    return 'Поле не может состоять только из цифр';
  }

  return true;
};

export const validateEmail = (value = '') => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (!isEmail) {
    return 'Почта должна быть валидной';
  }

  return true;
};

export const validatePhone = (value = '') => {
  if (!length(value, 10, 15)) {
    return 'Номер телефона должен быть от 10 до 15 символов';
  }

  const isNumberWithOptionalPlus = /^\+?\d+$/.test(value);

  if (!isNumberWithOptionalPlus) {
    return 'Номер телефона должен содержать только цифры';
  }

  return true;
};
