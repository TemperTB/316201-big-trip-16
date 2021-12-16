import { renderElement, RenderPosition, } from './utils/render.js';
import { generatePoint } from './mock/point.js';
import { TripTabsView } from './view/trip-tabs-view.js';
import { TripFiltersView } from './view/trip-filters-view.js';
import { TripPresenter } from './presenter/trip-presenter.js';


const POINT_COUNT = 15;
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.page-body__page-main').querySelector('.page-body__container');

const points = [];
for (let i = 0; i < POINT_COUNT; i++) {
  points[i] = generatePoint();
}

renderElement(menuContainer, new TripTabsView(), RenderPosition.BEFOREEND);
renderElement(filterContainer, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripContainer);
tripPresenter.init(points);

