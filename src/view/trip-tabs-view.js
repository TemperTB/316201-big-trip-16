import { createElement } from '../render.js';

/**
 * Разметка для меню
 */
const createTripTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`
);

/**
 * Меню
 */
class TripTabsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripTabsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export { TripTabsView };

