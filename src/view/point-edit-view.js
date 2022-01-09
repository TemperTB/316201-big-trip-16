import he from 'he';
import { SmartView } from './smart-view.js';
import { getDate } from '../utils/date.js';
import { doFirstLetterUpperCase } from '../utils/common.js';
import { EVENT_TYPES } from '../const.js';
import { OFFERS } from '../mock/offers.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

/**
 * Объект для добавления задачи
 */
const NEW_POINT = {
  dateBegin: undefined,
  dateEnd: undefined,
  type: EVENT_TYPES[0],
  destination: {
    description: 'Здесь будет описание города',
    name: 'Город',
    pictures: [
      {
        description: 'Картинка',
        src: 'http://picsum.photos/248/152?r=1',
      },
    ],
  },
  price: 0,
  offers: OFFERS[0].offers,
  isFavorite: false,
};

/**
 * Дополнительные опции
 * @param {Object[]} offers
 */
const createOffersTemplate = (thisType, offers) => {
  const addedOffers = [];
  for (const offer of offers) {
    addedOffers.push(offer.id);
  }

  let template = '';
  for (let i = 0; i < thisType.offers.length; i++) {
    template += `
      <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${thisType.offers[i].id}" type="checkbox" name="${
  thisType.offers[i].id
}" ${addedOffers.includes(thisType.offers[i].id) ? 'checked' : ''}>
            <label class="event__offer-label" for="${thisType.offers[i].id}">
              <span class="event__offer-title">${thisType.offers[i].title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${thisType.offers[i].price}</span>
            </label>
          </div>`;
  }
  return template;
};

/**
 * Проверяет есть ли доп опции у данного типа путешествия.
 * Если есть, отрисовывает для них блок.
 */
const createOffersSection = (typeForElement, offersForElement) => {
  let offers;
  for (const offer of OFFERS) {
    if (offer.type === typeForElement) {
      offers = offer;
    }
  }
  if (offers.offers.length === 0) {
    return '';
  }
  return `
  <section class='event__section  event__section--offers'>
    <h3 class='event__section-title  event__section-title--offers'>Offers</h3>

    <div class='event__available-offers'>${createOffersTemplate(offers, offersForElement)}</div>
  </section>`;
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
const createPointEditTemplate = (_data) => {
  const {
    destination,
    priceForElement,
    offersForElement,
    typeForElement,
    destinationNameForElement,
    dateBeginForElement,
    dateEndForElement,
  } = _data;
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeForElement}.png" alt="Event type icon">
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
            ${typeForElement}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationNameForElement)}" list="destination-list-1">
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(
    dateBeginForElement,
  )}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(
    dateEndForElement,
  )}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${priceForElement}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersSection(typeForElement, offersForElement)}
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
class PointEditView extends SmartView {
  #dateBeginPicker = null;
  #dateEndPicker = null;

  constructor(point = NEW_POINT) {
    super();
    this._data = PointEditView.parsePointToData(point);
    this.#setOnInner();
    this.#setDatepicker();
    this.#setOnPrice();
  }

  get template() {
    return createPointEditTemplate(this._data);
  }

  /**
   * Отменяет изменения в компоненте.
   * Переводит компонент в состояние, которое передается в параметрах
   * @param point - состояние к которому нужно привести компонент
   */
  reset = (point) => {
    this.updateData(PointEditView.parsePointToData(point));
  };

  /**
   * Восстанавливает обработчики
   */
  restoreHandlers = () => {
    this.#setOnInner();
    this.setOnFormSubmit(this._callback.formSubmit);
    this.#setDatepicker();
    this.#setOnPrice();
  };

  /**
   * Отрисовка flatpicker при клике на даты
   */
  #setDatepicker = () => {
    const datepickers = this.element.querySelectorAll('.event__input--time');
    this.#dateBeginPicker = flatpickr(datepickers[0], {
      dateFormat: 'd/m/Y H:i',
      enableTime: true,
      onChange: this.#onDateBeginChange,
    });

    this.#dateEndPicker = flatpickr(datepickers[1], {
      dateFormat: 'd/m/Y H:i',
      enableTime: true,
      onChange: this.#onDateEndChange,
    });
  };

  /**
   * Обработчик при нажатии кнопки Save (отправка формы)
   */
  setOnFormSubmit = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#onFormSubmit);
  };

  /**
   * Обработчик при нажатии кнопки Save (отправка формы)
   */
  setOnDeleteClick = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteClick);
  };

  /**
   * Обработчики для изменения типа точки маршрута и города назначения
   */
  #setOnInner = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationNameChange);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
  };

  /**
   * Обработчики для изменения типа точки маршрута и города назначения
   */
  #setOnPrice = () => {
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
  };

  /**
   * Действия при изменении названия города
   */
  #onDestinationNameChange = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        destinationNameForElement: evt.target.value,
      },
      true,
    );
  };

  /**
   * Действия при изменении цены
   */
  #onPriceChange = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        priceForElement: evt.target.value,
      },
      true,
    );
  };

  /**
   * Действия при изменении типа точки маршрута
   */
  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      typeForElement: evt.target.value,
      offersForElement: [],
    });
  };

  /**
   * Действия при изменении даты/время начала точки маршрута
   */
  #onDateBeginChange = ([userDate]) => {
    this.updateData(
      {
        dateBeginForElement: userDate,
      },
      true,
    );
  };

  /**
   * Действия при изменении даты/время окончания точки маршрута
   */
  #onDateEndChange = ([userDate]) => {
    this.updateData(
      {
        dateEndForElement: userDate,
      },
      true,
    );
  };

  /**
   * Возвращает массив добавленных дополнительных опций
   */
  #checkOffers = () => {
    const offerCheckboxes = this.element.querySelectorAll('.event__offer-checkbox');
    const checkedOffers = [];
    for (const offerCheckbox of offerCheckboxes) {
      if (offerCheckbox.checked) {
        checkedOffers.push(offerCheckbox.id);
      }
    }

    let currentOffer;
    for (const offer of OFFERS) {
      if (offer.type === this._data.typeForElement) {
        currentOffer = offer;
      }
    }

    const offers = [];
    for (const offer of currentOffer.offers) {
      if (checkedOffers.includes(offer.id)) {
        offers.push(offer);
      }
    }
    return offers;
  };

  /**
   * Действия при нажатии кнопки Save (отправка формы)
   */
  #onFormSubmit = (evt) => {
    evt.preventDefault();
    const checkedOffers = this.#checkOffers();

    this.updateData(
      {
        offersForElement: checkedOffers,
      },
      true,
    );
    this._callback.formSubmit(PointEditView.parseDataToPoint(this._data));
  };

  /**
   * Действия при нажатии кнопки Delete (удаление точки)
   */
  #onDeleteClick = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  };

  /**
   *
    Перевод из данных в состояние
   */
  static parsePointToData = (point) => ({
    ...point,
    typeForElement: point.type,
    destinationNameForElement: point.destination.name,
    dateBeginForElement: point.dateBegin,
    dateEndForElement: point.dateEnd,
    priceForElement: point.price,
    offersForElement: point.offers,
  });

  /**
   * перевод из состояния в данные
   */
  static parseDataToPoint = (data) => {
    const point = { ...data };

    point.type = point.typeForElement;
    point.destination.name = point.destinationNameForElement;
    point.dateBegin = point.dateBeginForElement;
    point.dateEnd = point.dateEndForElement;
    point.price = point.priceForElement;
    point.offers = point.offersForElement;

    delete point.typeForElement;
    delete point.destinationNameForElement;
    delete point.dateBeginForElement;
    delete point.dateEndForElement;
    delete point.priceForElement;
    delete point.offersForElement;

    return point;
  };

  /**
   * Перегружаем метод удаления элемента, чтобы при удалении удалялся более не нужный календарь.
   */
  removeElement = () => {
    super.removeElement();

    if (this.#dateBeginPicker) {
      this.#dateBeginPicker.destroy();
      this.#dateBeginPicker = null;
    }
    if (this.#dateEndPicker) {
      this.#dateEndPicker.destroy();
      this.#dateEndPicker = null;
    }
  };
}

export { PointEditView };
