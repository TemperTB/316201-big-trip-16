
import { TripView } from '../view/trip-view.js';
import { TripSortView } from '../view/trip-sort-view.js';
import { PointListView } from '../view/point-list-view.js';
import { EmptyTripView } from '../view/empty-trip-view.js';

import {MainTripInfoView} from '../view/main-trip-info-view.js';
import { renderElement, RenderPosition } from '../utils/render.js';
import { PointPresenter } from './point-presenter.js';

const TripInfoContainer = document.querySelector('.trip-main');

class TripPresenter {
  #tripContainer = null;
  #tripInfoComponent = null;

  #tripComponent = new TripView();
  #pointListComponent = new PointListView();
  #emptyTripComponent = new EmptyTripView();
  #sortComponent = new TripSortView();

  #points = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (points) => {
    this.#points = [...points];

    renderElement(this.#tripContainer, this.#tripComponent, RenderPosition.BEFOREEND);
    this.#renderTrip();
  };

  #renderEmptyTrip = () => {
    renderElement(this.#tripComponent, this.#emptyTripComponent, RenderPosition.BEFOREEND);
  };

  #renderSort = () => {
    renderElement(this.#tripComponent, this.#sortComponent, RenderPosition.BEFOREEND);
  };

  #renderPointList = () => {
    renderElement(this.#tripComponent, this.#pointListComponent, RenderPosition.BEFOREEND);
    this.#renderPoints(0, this.#points.length);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent);
    pointPresenter.init(point);
  };

  #renderPoints = (from, to) => {
    for (let i = 0; i < to; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #renderTripInfo = () => {
    this.#tripInfoComponent = new MainTripInfoView(this.#points);
    renderElement(TripInfoContainer, this.#tripInfoComponent, RenderPosition.BEFOREEND);
  };

  #renderTrip = () => {
    if (this.#points.length === 0) {
      this.#renderEmptyTrip();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderPointList();
  };
}

export { TripPresenter };