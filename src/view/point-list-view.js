import { AbstractView } from './abstract-view.js';

/**
 * Разметка для списка точек маршрута
 */
const createPointListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

/**
 * Список точек маршрута
 */
class PointListView extends AbstractView {
  get template() {
    return createPointListTemplate();
  }
}

export { PointListView };
