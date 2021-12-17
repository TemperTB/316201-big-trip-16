import AbstractView from './abstract-view.js';
import { transformDate, calcDiffBetweenDates } from '../utils/date.js';

/**
 * Дополнительные опции
 * @param {Object[]} offers
 */
const createOffersTemplate = (offers) => {
  if (offers.length === 0) {
    return '';
  }
  let template = '';
  for (const offer of offers) {
    template += `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
  }
  return template;
};

/**
 * Разметки точка маршрута
 */
const createPointTemplate = (point) => {
  const { dateBegin, dateEnd, type, tripTo, price, offers, isFavorite } = point;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${transformDate(dateBegin, 'YYYY-MM-DD')}">${transformDate(
  dateBegin,
  'MMM DD',
)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${tripTo}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${transformDate(dateBegin, 'YYYY-MM-DD')}">${transformDate(
  dateBegin,
  'HH:mm',
)}</time>
          &mdash;
          <time class="event__end-time" datetime="${transformDate(dateBegin, 'YYYY-MM-DD')}">${transformDate(
  dateEnd,
  'HH:mm',
)}</time>
        </p>
        <p class="event__duration">${calcDiffBetweenDates(dateEnd, dateBegin)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

/**
 * Точка маршрута
 */
class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  /**
   * Обработчик клика стрелку для открытия формы редактирования
   */
  setOnEditClick = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditClick);
  };

  /**
   * Действия при клике на стрелку для открытия формы редактирования
   */
  #onEditClick = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  /**
   * Обработчик клика на звездочку (избранное)
   */
  setOnFavoriteClick = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClick);
  };

  /**
   * Действия при клике на звездочку (избранное)
   */
  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}

export { PointView };
