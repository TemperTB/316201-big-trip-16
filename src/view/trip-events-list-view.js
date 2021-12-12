import AbstractView from './abstract-view.js';

/**
 * Разметка для списка точек маршрута
 */
const createTripEventsListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

/**
 * Список точек маршрута
 */
class TripEventsListView extends AbstractView {
  get template() {
    return createTripEventsListTemplate();
  }
}

export { TripEventsListView };
