import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { OFFER_TYPES } from '../const.js';
import { getRandomInteger } from '../utils/common.js';
import { generateOffers } from './offers.js';

const CITIES = [
  'Moscow',
  'London',
  'Paris',
  'Noyabrsk',
  'Dublin',
  'New-York',
  'Chelyabinsk',
  'Ekaterinburg',
  'Belgorod',
];
const MAX_PRICE = 20000;
const MAX_OFFERS = 5;
const MAX_COUNT_DESCRIPTIONS = 5;
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
];
const MAX_PHOTOS = 3;

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
 * Генерирует описание
 * @returns {String}
 */
const generateDescription = () => {
  const countDescriptions = getRandomInteger(1, MAX_COUNT_DESCRIPTIONS);
  let description = '';
  for (let i = 1; i <= countDescriptions; i++) {
    description += DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  }
  return description;
};

/**
 * Генерирует фотографии
 * @returns {Object[]}
 */
const generatePhotos = () => {
  const countPhotos = getRandomInteger(1, MAX_PHOTOS);
  const photos = [];
  for(let i = 0; i < countPhotos; i++ ) {
    photos[i] = `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
  }
  return photos;
};

/**
 * Генерирует точку маршрута
 * @returns {Object}
 */
const generatePoint = () => {
  const dates = generateDates();
  const type = OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)];
  const tripTo = CITIES[getRandomInteger(0, CITIES.length - 1)];
  const price = getRandomInteger(1, MAX_PRICE);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const description = generateDescription();
  const photos = generatePhotos();
  const offers = generateOffers(getRandomInteger(0, MAX_OFFERS));

  return {
    id: nanoid(),
    dateBegin: dates[0],
    dateEnd: dates[1],
    type,
    tripTo,
    price,
    offers,
    isFavorite,
    description,
    photos,
  };
};

export { generatePoint };
