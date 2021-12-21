import AbstractView from './abstract-view.js';
import { transformDate } from '../utils/date.js';
import { doFirstLetterUpperCase } from '../utils/common.js';
import { EVENT_TYPES } from '../const.js';
import { OFFERS } from '../mock/offers.js';

/**
 * Дополнительные опции
 * @param {Object[]} offers
 */
const createOffersTemplate = (type, offers) => {
  let thisType;
  for (const offer of OFFERS) {
    if (offer.type === type) {
      thisType = offer;
    }
  }

  const addedOffers = [];
  for (const offer of offers) {
    addedOffers.push(offer.id);
  }

  let template = '';
  for (let i = 0; i < thisType.offers.length; i++) {
    template += `
      <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${thisType.type}-${
      thisType.offers[i].id
    }" type="checkbox" name="event-offer-${thisType.type}-${thisType.offers[i].id}" ${
      addedOffers.includes(thisType.offers[i].id) ? 'checked' : ''
    }>
            <label class="event__offer-label" for="event-offer-${thisType.type}-${thisType.offers[i].id}">
              <span class="event__offer-title">${thisType.offers[i].title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${thisType.offers[i].price}</span>
            </label>
          </div>`;
  }
  return template;
};

/**
 * Создает список для выбора типа поездки
 */
const createEvenTypeItems = () => {
  let template = '';
  for (const eventType of EVENT_TYPES) {
    template += `
      <div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${doFirstLetterUpperCase(
      eventType,
    )}</label>
      </div>`;
  }
  return template;
};

/**
 * Разметка для формы изменения точки маршрута
 */
const createPointEditTemplate = (point) => {
  const { dateBegin, dateEnd, type, destination, price, offers } = point;
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEvenTypeItems()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
            destination.name
          }" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Moscow"></option>
            <option value="London"></option>
            <option value="Paris"></option>
            <option value="Noyabrsk"></option>
            <option value="Dublin"></option>
            <option value="New-York"></option>
            <option value="Chelyabinsk"></option>
            <option value="Ekaterinburg"></option>
            <option value="Belgorod"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${transformDate(
            dateBegin,
            'DD/MM/YY HH:mm',
          )}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${transformDate(
            dateEnd,
            'DD/MM/YY HH:mm',
          )}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersTemplate(type, offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
        </section>
      </section>
    </form>
  </li>`;
};

/**
 * Форма изменения точки маршрута
 */
class PointEditView extends AbstractView {
  constructor(point) {
    super();
    this._data = PointEditView.parsePointToData(point);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationNameChange);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
  }

  get template() {
    return createPointEditTemplate(this._data);
  }

  updateData = (update) => {
    if (!update) {
      return;
    }

    this._data = { ...this._data, ...update };

    this.updateElement();
  };

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
  };

  /**
   * Обработчик при нажатии кнопки Save (отправка формы)
   */
  setOnFormSubmit = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#onFormSubmit);
  };

  /**
   * Действия при изменении названия города
   */
  #onDestinationNameChange = () => {
    console.log(1);
  };

  /**
   * Действия при изменении типа точки маршрута
   */
  #onTypeChange = (evt) => {
    this.element.querySelector('.event__type-icon').src = `img/icons/${evt.target.value}.png`;
    this.element.querySelector('.event__type-output').textContent = evt.target.value;
    this.element.querySelector('.event__type-toggle:checked').checked = false;
  };

  /**
   * Действия при нажатии кнопки Save (отправка формы)
   */
  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  };

  static parsePointToData = (point) => ({
    ...point,
    // isDueDate: point.dueDate !== null,
    // isRepeating: isTaskRepeating(point.repeating),
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    //   if (!point.isDueDate) {
    //     point.dueDate = null;
    //   }

    //   if (!point.isRepeating) {
    //     point.repeating = {
    //       mo: false,
    //       tu: false,
    //       we: false,
    //       th: false,
    //       fr: false,
    //       sa: false,
    //       su: false,
    //     };
    //   }

    //   delete point.isDueDate;
    //   delete point.isRepeating;

    return point;
  };
}

export { PointEditView };
