import dayjs from 'dayjs';
import { addZero } from './common.js';
import duration from '../../node_modules/dayjs/plugin/duration.js';

dayjs.extend(duration);


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
 * Форматирование продолжительности
 * @example 01D 02H 30M
*/
const calcDuration = (value) => {

  const days = dayjs.duration(value).days();
  const hours = dayjs.duration(value).hours();
  const minutes = dayjs.duration(value).minutes();
  let result = '';
  if (days > 0) {
    result += `${addZero(days)}D `;
  }
  if (hours > 0) {
    result += `${addZero(hours)}H `;
  }
  if (minutes > 0) {
    result += `${addZero(minutes)}M`;
  }
  return result;
};


/**
 * Вычисляет разницу между датой окончания и датой начала
 * @param {Date} dateEnd - дата окончания
 * @param {Date} dateBegin - дата начала
 */
const calcDiffBetweenDates = (dateEnd, dateBegin) => {
  const diff = dayjs(dateEnd).diff(dayjs(dateBegin));
  return diff;
};

/**
 * Проверяет является ли дата окончания маршрута прошедшей датой
 */
const isDateEndPast = (dateEnd) => (dayjs() > dayjs(dateEnd));

/**
 * Проверяет является ли дата начала маршрута будущей датой
 */
const isDateBeginFuture = (dateBegin) => dayjs() < dayjs(dateBegin);

export { transformDate, calcDiffBetweenDates, getDate, isDateEndPast, isDateBeginFuture, calcDuration };
