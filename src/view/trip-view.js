import AbstractView from './abstract-view.js';

/**
 * Разметка для путешествия
 */
const createTripTemplate = () =>
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`;

/**
 * Путешествие
 */
class TripView extends AbstractView {
  get template() {
    return createTripTemplate();
  }
}

export { TripView };
