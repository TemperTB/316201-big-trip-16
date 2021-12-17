/**
 * Возвращает случайное число в диапазоне от минимального до максимального
 * @param {Number} a - минимальное число
 * @param {Number} b - максимальное число
 * @returns {Number}
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Добавляет 0 вначале (если нужно) для достижения числа из 2х цифр
 */
const addZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

/**
 * Возвращает исходную строку с заглавной буквы
 * @param {String} str
 * @returns
 */
const doFirstLetterUpperCase = (str) => str[0].toUpperCase() + str.slice(1);

/**
 * Обновляет элемент в Map, при совпадении по ключу id.
 * @param {Map} items
 * @param {Object} update - элемент с обновленными данными
 */
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export { getRandomInteger, addZero, doFirstLetterUpperCase, updateItem };
