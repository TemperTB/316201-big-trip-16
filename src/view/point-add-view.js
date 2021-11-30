import { transformDate } from '../utils.js';
import { OFFERS } from '../mock/offers.js';
import { OFFER_TYPES } from '../const.js';

/**
 * Дополнительные опции
 * @param {Object[]} offers
 */
const createOffersTemplate = (offers) => {
  const addedOffers = [];
  for (const offer of offers) {
    addedOffers.push(Object.entries(offer)[0][1]);
  }

  let template = '';
  for (const offer of OFFERS) {
    template += `
      <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}" type="checkbox" name="event-offer-${offer.title}" ${addedOffers.includes(offer.title) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.title}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`;
  }
  return template;

};

/**
 * Фотографии
 * @param {Object[]} photos
 */
const createPhotosTemplate = (photos) => {
  let template = '';
  for (const photo of photos) {
    template += `
      <img class="event__photo" src="${photo}" alt="Event photo">`;
  }
  return template;

};

/**
 * Создает список для выбора типа поездки
 */
const createEvenTypeItems = () => {
  let template = '';
  for(const offerType of OFFER_TYPES) {
    template += `
      <div class="event__type-item">
        <input id="event-type-${offerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType}">
        <label class="event__type-label  event__type-label--${offerType}" for="event-type-${offerType}-1">${offerType}</label>
      </div>`;
  }
  return template;

};

/**
 * Форма создания
 */
const createPointAddTemplate = (point) => {
  const { dateBegin, dateEnd, type, tripTo, offers, description, photos } = point;
  return `<form class="event event--edit" action="#" method="post">
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripTo}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotosTemplate(photos)}
          </div>
        </div>
      </section>
    </section>
  </form>`;
};

export { createPointAddTemplate };
