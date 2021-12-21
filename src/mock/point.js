import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { EVENT_TYPES } from '../const.js';
import { getRandomInteger } from '../utils/common.js';
import { generateOffers } from './offers.js';
import { DESTINATIONS } from './destination.js';

const MAX_PRICE = 20000;
const MAX_OFFERS = 5;

/**
 * Генерирует дату начала и конца
 * @returns {Object[]}
 */
const generateDates = () => {
  const maxDaysGap = 2;
  const maxHoursGap = 24;
  const maxMinutesGap = 60;
  const firstDaysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const secondDaysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const firstHoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const secondHoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const firstMinutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const secondMinutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const firstDate = dayjs().add(firstDaysGap, 'day').add(firstHoursGap, 'hour').add(firstMinutesGap, 'minute');
  const secondDate = dayjs().add(secondDaysGap, 'day').add(secondHoursGap, 'hour').add(secondMinutesGap, 'minute');
  if (firstDate.isBefore(secondDate)) {
    return [firstDate, secondDate];
  }
  return [secondDate, firstDate];
};

/**
 * Генерирует точку маршрута
 * @returns {Object}
 */
const generatePoint = () => {
  const dates = generateDates();
  const type = EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)];
  const price = getRandomInteger(1, MAX_PRICE);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const offers = generateOffers(type, getRandomInteger(0, MAX_OFFERS));
  const destination = DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)];

  return {
    id: nanoid(),
    dateBegin: dates[0],
    dateEnd: dates[1],
    type,
    destination: destination,
    price,
    offers,
    isFavorite,
  };
};

export { generatePoint };
