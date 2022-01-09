
import { TripView } from '../view/trip-view.js';
import { TripSortView } from '../view/trip-sort-view.js';
import { PointListView } from '../view/point-list-view.js';
import { EmptyTripView } from '../view/empty-trip-view.js';
import { MainTripInfoView } from '../view/main-trip-info-view.js';
import { renderElement, RenderPosition, removeComponent } from '../utils/render.js';
import { PointPresenter } from './point-presenter.js';
import { PointNewPresenter } from './point-new-presenter.js';
import { sortDays, sortPrice, sortTime } from '../utils/sort-points.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';

const TripInfoContainer = document.querySelector('.trip-main');

/**
 * Презентер для доски путешествия
 */
class TripPresenter {
  #tripContainer = null;
  #tripInfoComponent = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterModel = null;
  #emptyTripComponent = null;
  #pointNewPresenter = null;

  #tripComponent = new TripView();
  #pointListComponent = new PointListView();

  #pointPresenter = new Map();
  #currentSortType = SortType.DAYS;
  #filterType = FilterType.EVERYTHING;

  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#pointListComponent, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAYS:
        return filteredPoints.sort(sortDays);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
    }
    return filteredPoints;
  }

  /**
   * Инициализация
   */
  init = () => {
    renderElement(this.#tripContainer, this.#tripComponent, RenderPosition.BEFOREEND);
    this.#renderTrip();
  };

  /**
   * Создание задачи
   */
  createTask = () => {
    this.#currentSortType = SortType.DAYS;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  };

  /**
   * Действие при изменении режима отображения точки маршрута
   * По ТЗ все остальные формы редактирования должны закрыться
   */
  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  /**
   * Вызов обновления модели при действиях пользователя
   */
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  /**
   * Изменения модели при действиях пользователя
   */
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  };

  /**
   * Действия при сортировке
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  /**
   * Отрисовка пустого маршрута
   */
  #renderEmptyTrip = () => {
    this.#emptyTripComponent = new EmptyTripView(this.#filterType);
    renderElement(this.#tripComponent, this.#emptyTripComponent, RenderPosition.BEFOREEND);
  };

  /**
   * Сортировка
   */
  #renderSort = () => {
    this.#sortComponent = new TripSortView(this.#currentSortType);
    this.#sortComponent.setOnSortTypeChange(this.#handleSortTypeChange);
    renderElement(this.#tripComponent, this.#sortComponent, RenderPosition.BEFOREEND);
  };

  /**
   * Отрисовка точки маршрута
   */
  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  /**
   * Отрисовка точек маршрута (от, до)
   */
  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  /**
   * Отрисовка информации о путешествии
   */
  #renderTripInfo = () => {
    this.#tripInfoComponent = new MainTripInfoView(this.points);
    renderElement(TripInfoContainer, this.#tripInfoComponent, RenderPosition.BEFOREEND);
  };

  /**
   * Очистка путешествия
   */
  #clearTrip = (resetSortType = false) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#emptyTripComponent) {
      removeComponent(this.#emptyTripComponent);
    }
    removeComponent(this.#tripInfoComponent);
    removeComponent(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAYS;
    }
  };

  /**
   * Отрисовка путешествия
   */
  #renderTrip = () => {

    this.#renderTripInfo();
    this.#renderSort();
    const points = this.points;
    const pointsCount = points.length;

    renderElement(this.#tripComponent, this.#pointListComponent, RenderPosition.BEFOREEND);
    if (pointsCount === 0) {
      this.#renderEmptyTrip();
      return;
    }
    this.#renderPoints(this.points);
  };
}

export { TripPresenter };
