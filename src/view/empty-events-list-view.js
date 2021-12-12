import AbstractView from './abstract-view.js';

/**
 * Разметка для списка точек маршрута
 */
const createEmptyEventsListTemplate = () =>
  '<p class="trip-events__msg">Click New Event to create your first point</p>';

/**
 * Список точек маршрута
 */
class EmptyEventsListView extends AbstractView {
  get template() {
    return createEmptyEventsListTemplate();
  }
}

export { EmptyEventsListView };
