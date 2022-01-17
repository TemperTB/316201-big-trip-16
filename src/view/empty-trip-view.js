import { AbstractView } from './abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'No points in the past',
  [FilterType.FUTURE]: 'No points in the future',
};

/**
 * Разметка для списка точек маршрута
 */
const createEmptyTripTemplate = (filterType) => {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
};

/**
 * Список точек маршрута
 */
class EmptyTripView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createEmptyTripTemplate(this._data);
  }
}

export { EmptyTripView };
