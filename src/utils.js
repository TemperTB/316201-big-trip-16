import dayjs from 'dayjs';

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
 * Трансформирует дату начала для отображения в столбце Day
 */
const transformDateforColumnDay = (date) => dayjs(date).format('MMM DD');

/**
 * Трансформирует дату начала для отображения в столбце Time
 */
const transformDateforColumnTime = (date) => dayjs(date).format('HH:mm');

export { getRandomInteger, transformDateforColumnDay, transformDateforColumnTime };
