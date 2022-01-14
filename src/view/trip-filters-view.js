import AbstractView from './abstract-view.js';

/**
 * Разметка input radio для одного фильтра
 */
const createTripFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name } = filter;
  return `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${
  type === currentFilterType ? 'checked' : ''
}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`;
};

/**
 * Разметка для фильтров
 */
const createTripFiltersTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters.map((filter) => createTripFilterItemTemplate(filter, currentFilterType)).join('');
  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

/**
 * Фильтры
 */
class TripFiltersView extends AbstractView {
  #filters = null
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters, this.#currentFilter);
  }

  /**
   * Добавление обработчика на изменение фильтра
   */
  setOnFilterChange = (callback) => {
    this._callback.filterChange = callback;
    this.element.addEventListener('change', this.#onFilterChange);
  };

  /**
   * Действия при изменении фильтра
   */
  #onFilterChange = (evt) => {
    evt.preventDefault();
    this._callback.filterChange(evt.target.value);
  };
}

export { TripFiltersView };
