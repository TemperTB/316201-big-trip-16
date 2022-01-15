import AbstractView from './abstract-view.js';
import { transformDate } from '../utils/date.js';

const PRICE = 'price';
const DESTINATION = 'destination';
const CITY_NAME = 'name';
const DATE_BEGIN = 'dateBegin';
const DATE_END = 'dateEnd';

/**
 * Разметка для названий городов в блоке общей информации о путешествии
 */
const createTripTitle = (cities) => {
  switch (cities.length) {
    case 1:
      return cities[0];
    case 2:
      return `${cities[1]} - ${cities[0]}`;
    case 3:
      return `${cities[2]} - ${cities[1]} - ${cities[0]}`;
    default :
      return `${cities[cities.length - 1]} - ... - ${cities[0]}`;
  }
};

/**
 * Разметка для общей информации о путешевствии
 */
const createMainTripInfoTemplate = (points) => {

  if (points.length === 0) {
    return ' ';
  }

  let totalPrice = 0;
  for (const point of points) {
    totalPrice += +point[PRICE];
    for (const offer of point.offers) {
      totalPrice += offer.price;
    }
  }

  const cities = [];
  cities[0] = points[0][DESTINATION][CITY_NAME];

  for (let i = 1; i < points.length; i++) {
    if (points[i][DESTINATION][CITY_NAME] !== cities[cities.length - 1]) {
      cities.push(points[i][DESTINATION][CITY_NAME]);
    }
  }

  const dateBegin = points[points.length - 1][DATE_BEGIN];
  const dateEnd = points[0][DATE_END];

  return `<section class='trip-main__trip-info  trip-info'>
  <div class='trip-info__main'>
    <h1 class='trip-info__title'>
      ${createTripTitle(cities)}
    </h1>
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

/**
 * Общая информация о путешевствии
 */
class MainTripInfoView extends AbstractView {
  #points = [];

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createMainTripInfoTemplate(this.#points);
  }
}

export { MainTripInfoView };
