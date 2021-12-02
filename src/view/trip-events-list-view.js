import { createElement } from '../render.js';

/**
 * Разметка для списка точек маршрута
 */
const createTripEventsListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

/**
 * Список точек маршрута
 */
class TripEventsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export { TripEventsListView };
