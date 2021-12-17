import AbstractView from './abstract-view.js';

/**
 * Разметка для списка точек маршрута
 */
const createEmptyTripTemplate = () =>
  '<p class="trip-events__msg">Click New Event to create your first point</p>';

/**
 * Список точек маршрута
 */
class EmptyTripView extends AbstractView {
  get template() {
    return createEmptyTripTemplate();
  }
}

export { EmptyTripView };
