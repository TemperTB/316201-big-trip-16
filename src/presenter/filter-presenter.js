import { TripFiltersView } from '../view/trip-filters-view.js';
import { renderElement, RenderPosition, replaceElements, removeComponent } from '../utils/render.js';
import { FilterType, UpdateType } from '../const.js';

class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.PAST,
        name: 'Past',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setOnFilterChange(this.#OnFilterChange);

    this.#pointsModel.addObserver(this.#OnModelEvent);
    this.#filterModel.addObserver(this.#OnModelEvent);

    if (prevFilterComponent === null) {
      renderElement(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replaceElements(this.#filterComponent, prevFilterComponent);
    removeComponent(prevFilterComponent);
  };

  destroy = () => {
    removeComponent(this.#filterComponent);
    this.#filterComponent = null;

    this.#pointsModel.removeObserver(this.#OnModelEvent);
    this.#filterModel.removeObserver(this.#OnModelEvent);

    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
  };

  #OnModelEvent = () => {
    this.init();
  };

  #OnFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MINOR, filterType);
  };
}

export { FilterPresenter };
