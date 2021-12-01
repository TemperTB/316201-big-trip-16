import { transformDate } from '../utils.js';

const KEY_FOR_PRICE = 'price';
const KEY_FOR_CITY = 'tripTo';
const KEY_FOR_DATE_BEGIN = 'dateBegin';
const KEY_FOR_DATE_END = 'dateEnd';

/**
 * Общая информация о путешевствии
 */
const createMainTripInfoTemplate = (points) => {
  let totalPrice = 0;
  for (const point of points) {
    const entries = Object.entries(point);
    for (const entry of entries) {
      if (entry[0] === KEY_FOR_PRICE) {
        totalPrice += entry[1];
      }
    }
  }

  const cities = [];
  const entriesForFirstCity = Object.entries(points[0]);
  for (const entry of entriesForFirstCity) {
    if (entry[0] === KEY_FOR_CITY) {
      cities[0] = entry[1];
    }
  }
  for (let i = 1; i < points.length; i++) {
    const entries = Object.entries(points[i]);
    for (const entry of entries) {
      if (entry[0] === KEY_FOR_CITY && entry[1] !== cities[cities.length - 1]) {
        cities.push(entry[1]);
      }
    }
  }

  let dateBegin;
  const entriesForDateBegin = Object.entries(points[0]);
  for (const entry of entriesForDateBegin) {
    if (entry[0] === KEY_FOR_DATE_BEGIN) {
      dateBegin = entry[1];
    }
  }

  let dateEnd;
  const entriesForDateEnd = Object.entries(points[points.length - 1]);
  for (const entry of entriesForDateEnd) {
    if (entry[0] === KEY_FOR_DATE_END) {
      dateEnd = entry[1];
    }
  }

  return `<section class='trip-main__trip-info  trip-info'>
  <div class='trip-info__main'>
    <h1 class='trip-info__title'>${
  cities.length > 2 ? `${cities[0]} — ... — ${cities[cities.length - 1]}` : `${cities[0]} — ${cities[1]}`
}</h1>

    <p class='trip-info__dates'>${transformDate(dateBegin, 'DD MMM')}&nbsp;&mdash;&nbsp;${transformDate(
  dateEnd,
  'DD MMM',
)}</p>
  </div>

  <p class='trip-info__cost'>
    Total: &euro;&nbsp;<span class='trip-info__cost-value'>${totalPrice}</span>
  </p>
</section>`;
};

export { createMainTripInfoTemplate };
