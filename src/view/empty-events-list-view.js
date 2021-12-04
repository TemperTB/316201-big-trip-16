import { createElement } from '../render.js';

/**
 * Разметка для списка точек маршрута
 */
const createEmptyEventsListTemplate = () =>
  '<p class="trip-events__msg">Click New Event to create your first point</p>';

/**
 * Список точек маршрута
 */
class EmptyEventsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyEventsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export { EmptyEventsListView };
