import { renderElement, RenderPosition, replaceElements } from './utils/render.js';
import { generatePoint } from './mock/point.js';
import { MainTripInfoView } from './view/main-trip-info-view.js';
import { TripTabsView } from './view/trip-tabs-view.js';
import { TripFiltersView } from './view/trip-filters-view.js';
import { TripSortView } from './view/trip-sort-view.js';
import { TripEventsListView } from './view/trip-events-list-view.js';
import { PointEditView } from './view/point-edit-view';
import { PointView } from './view/point-view';
import { EmptyEventsListView } from './view/empty-events-list-view.js';

const POINT_COUNT = 15;
const mainTripInfoContainer = document.querySelector('.trip-main');
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const points = [];
for (let i = 0; i < POINT_COUNT; i++) {
  points[i] = generatePoint();
}
renderElement(menuContainer, new TripTabsView(), RenderPosition.BEFOREEND);
renderElement(filterContainer, new TripFiltersView(), RenderPosition.BEFOREEND);
const tripList = new TripEventsListView();

/**
 * Отрисовка точек маршрута и их редактирования
 * @param {Object} tripList - DOM-элемент, внутри которого нужно отрисовывать точки маршрута
 * @param {Object} point - данные о точке маршрута
 */
const renderPoint = (point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  /**
   * Действие при нажатии Esc, когда открыта форма редактирования
   */
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceElements(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  /**
   * Действие при клике на стрелку для открытия формы редактирования
   */
  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceElements(pointEditComponent, pointComponent);
    document.addEventListener('keydown', onEscKeyDown);
  });

  /**
   * Действие при сохранении формы редактирования
   */
  pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceElements(pointComponent, pointEditComponent);
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(tripList, pointComponent, RenderPosition.BEFOREEND);
};

if (points.length === 0) {
  renderElement(sortContainer, new EmptyEventsListView(), RenderPosition.BEFOREEND);
} else {
  renderElement(mainTripInfoContainer, new MainTripInfoView(points), RenderPosition.AFTERBEGIN);
  renderElement(sortContainer, new TripSortView(), RenderPosition.BEFOREEND);
  renderElement(sortContainer, tripList, RenderPosition.BEFOREEND);
  for (const point of points) {
    renderPoint(point);
  }
}
