import dayjs from 'dayjs';
import { addZero } from './common.js';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

/**
 * Трансформирует дату и время в необходимый формат
 * @param {Date}
 * @param {String} - формат
 * @example NOV 24
 */
const transformDate = (date, format) => dayjs(date).format(format);

/**
 * Возвращает тип дата
 */
const getDate = (date) => dayjs(date);

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


export { transformDate, calcDiffBetweenDates, getDate };
