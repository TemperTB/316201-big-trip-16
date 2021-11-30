import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

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
 * Трансформирует дату и время в необходимый формат
 * @param {Date}
 * @param {String} - формат
 * @example NOV 24
 */
const transformDate = (date, format) => dayjs(date).format(format);

/**
 * Вычисляет разницу между датой окончания и датой начала
 * @param {Date} dateEnd - дата окончания
 * @param {Date} dateBegin - дата начала
 * @example 01D 02H 30M
 */
const calcDiffBetweenDates = (dateEnd, dateBegin) => {
  const diff = dayjs(dateEnd).diff(dayjs(dateBegin), 'minute');
  if (diff < MINUTES_IN_HOUR) {
    const minutes = addZero(diff);
    return `${minutes}M`;
  } else if (diff < MINUTES_IN_DAY) {
    const hours = addZero(dayjs(dateEnd).diff(dayjs(dateBegin), 'hour'));
    const minutes = addZero(diff % MINUTES_IN_HOUR);
    return `${hours}H ${minutes}M`;
  } else {
    const days = addZero(dayjs(dateEnd).diff(dayjs(dateBegin), 'day'));
    const hours = addZero(Math.trunc((diff % MINUTES_IN_DAY) / MINUTES_IN_HOUR));
    const minutes = addZero(diff % MINUTES_IN_HOUR);
    return `${days}D ${hours}H ${minutes}M`;
  }
};

export {
  getRandomInteger,
  transformDate,
  calcDiffBetweenDates,
};
