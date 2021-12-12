import AbstractView from './abstract-view.js';
import { transformDate } from '../utils/date.js';

const KEY_FOR_PRICE = 'price';
const KEY_FOR_CITY = 'tripTo';
const KEY_FOR_DATE_BEGIN = 'dateBegin';
const KEY_FOR_DATE_END = 'dateEnd';

/**
 * Разметка для общей информации о путешевствии
 */
const createMainTripInfoTemplate = (points) => {
  let totalPrice = 0;
  for (const point of points) {
    totalPrice += point[KEY_FOR_PRICE];
  }

  const cities = [];
  cities[0] = points[0][KEY_FOR_CITY];

  for (let i = 1; i < points.length; i++) {
    if (points[i][KEY_FOR_CITY] !== cities[cities.length - 1]) {
      cities.push(points[i][KEY_FOR_CITY]);
    }
  }

  const dateBegin = points[0][KEY_FOR_DATE_BEGIN];
  const dateEnd = points[points.length - 1][KEY_FOR_DATE_END];

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
