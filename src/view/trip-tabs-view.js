import AbstractView from './abstract-view.js';

/**
 * Разметка для меню
 */
const createTripTabsTemplate = () =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;

/**
 * Меню
 */
class TripTabsView extends AbstractView {
  get template() {
    return createTripTabsTemplate();
  }
}

export { TripTabsView };
