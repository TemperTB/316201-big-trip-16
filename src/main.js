import { render, RenderPosition } from './render.js';
import { generatePoint } from './mock/point.js';
import { MainTripInfoView } from './view/main-trip-info-view.js';
import { TripTabsView } from './view/trip-tabs-view.js';
import { TripFiltersView } from './view/trip-filters-view.js';
import { TripSortView } from './view/trip-sort-view.js';
import { TripEventsListView } from './view/trip-events-list-view.js';
//import { PointAddView } from './view/point-add-view';
import { PointEditView } from './view/point-edit-view';
import { PointView } from './view/point-view';

const POINT_COUNT = 15;
const mainTripInfoContainer = document.querySelector('.trip-main');
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const points = [];
for (let i = 0; i < POINT_COUNT; i++) {
  points[i] = generatePoint();
}
render(mainTripInfoContainer, new MainTripInfoView(points).element, RenderPosition.AFTERBEGIN);
render(menuContainer, new TripTabsView().element, RenderPosition.BEFOREEND);
render(filterContainer, new TripFiltersView().element, RenderPosition.BEFOREEND);
render(sortContainer, new TripSortView().element, RenderPosition.BEFOREEND);
const tripList = new TripEventsListView().element;
render(sortContainer, tripList, RenderPosition.BEFOREEND);

/**
 * Отрисовка точек маршрута и их редактирования
 * @param {Object} tripList - DOM-элемент, внутри которого нужно отрисовывать точки маршрута
 * @param {Object} point - данные о точке маршрута
 */
const renderPoint = (point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  /**
   * "Открытие" формы редактирования
   */
  const replacePointToEdit = () => {
    tripList.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  /**
   * "Закрытие" формы редактирования
   */
  const replaceEditToPoint = () => {
    tripList.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  /**
   * Действие при нажатии Esc, когда открыта форма редактирования
   */
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  /**
   * Действие при клике на стрелку для открытия формы редактирования
   */
  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  /**
   * Действие при клике на стрелку для открытия формы редактирования
   */
  pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripList, pointComponent.element, RenderPosition.BEFOREEND);
};

for (const point of points) {
  renderPoint(point);
}

//render(tripList, new PointAddView(points[points.length-1]).element, RenderPosition.BEFOREEND);


