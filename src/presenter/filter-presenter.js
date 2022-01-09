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

    this.#pointsModel.addObserver(this.#OnModelEvent);
    this.#filterModel.addObserver(this.#OnModelEvent);
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

    if (prevFilterComponent === null) {
      renderElement(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replaceElements(this.#filterComponent, prevFilterComponent);
    removeComponent(prevFilterComponent);
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
