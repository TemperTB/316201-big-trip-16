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
 */
const doFirstLetterUpperCase = (str) => str[0].toUpperCase() + str.slice(1);

/**
 *Сравнивает два значения и возвращает true если они разные
 */
const isDifferentValue = (firstValue, secondValue) => (firstValue !== secondValue);


export { addZero, doFirstLetterUpperCase, isDifferentValue };
