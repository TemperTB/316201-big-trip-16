
import { TripView } from '../view/trip-view.js';
import { TripSortView } from '../view/trip-sort-view.js';
import { PointListView } from '../view/point-list-view.js';
import { EmptyTripView } from '../view/empty-trip-view.js';
import { PointView } from '../view/point-view.js';
import { PointEditView } from '../view/point-edit-view.js';
import {MainTripInfoView} from '../view/main-trip-info-view.js';
import { renderElement, RenderPosition, replaceElements } from '../utils/render.js';

const TripInfoContainer = document.querySelector('.trip-main');

class TripPresenter {
  #tripContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
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
    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);

    /**
     * Действие при нажатии Esc, когда открыта форма редактирования
     */
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceElements(this.#pointComponent, this.#pointEditComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    /**
     * Действие при клике на стрелку для открытия формы редактирования
     */
    this.#pointComponent.setOnEditClick(() => {
      replaceElements(this.#pointEditComponent, this.#pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    });

    /**
     * Действие при сохранении формы редактирования
     */
    this.#pointEditComponent.setOnFormSubmit(() => {
      replaceElements(this.#pointComponent, this.#pointEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    renderElement(this.#pointListComponent, this.#pointComponent, RenderPosition.BEFOREEND);
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
