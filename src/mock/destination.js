import { getRandomInteger } from '../utils/common.js';

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
const DESTINATIONS =[];
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
 * Генерирует картинки с описанием
 * @returns {Object[]}
 */
const generatePictures = () => {
  const countPictures = getRandomInteger(1, MAX_PHOTOS);
  const pictures = [];
  for (let i = 0; i < countPictures; i++) {
    pictures[i] = {};
    pictures[i].src = `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
    pictures[i].description = generateDescription();
  }
  return pictures;
};

/**
 * Генерирует назначение
 */
const generateDestination = () => {
  for (let i = 0; i < CITIES.length; i++) {
    DESTINATIONS[i] = {};
    DESTINATIONS[i].description = generateDescription();
    DESTINATIONS[i].name = CITIES[getRandomInteger(0, CITIES.length - 1)];
    DESTINATIONS[i].pictures = generatePictures();
  }
};

generateDestination();

export { DESTINATIONS };
