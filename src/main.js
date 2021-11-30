import { renderTemplate, RenderPosition } from './render.js';
import { generatePoint } from './mock/point.js';
import { createMainTripInfoTemplate } from './view/main-trip-info-view.js';
import { createTripTabsTemplate } from './view/trip-tabs-view.js';
import { createTripFiltersTemplate } from './view/trip-filters-view.js';
import { createTripSortTemplate } from './view/trip-sort-view.js';
import { createPointAddTemplate } from './view/point-add-view';
import { createPointEditTemplate } from './view/point-edit-view';
import { createPointTemplate } from './view/point-view';

const POINT_COUNT = 15;
const mainTripInfoContainer = document.querySelector('.trip-main');
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const eventList = document.createElement('ul');
eventList.classList.add('trip-events__list');

const points = [];
for (let i = 0; i < POINT_COUNT; i++) {
  points[i] = generatePoint();
}

renderTemplate(mainTripInfoContainer, createMainTripInfoTemplate(points), RenderPosition.AFTERBEGIN);
renderTemplate(menuContainer, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterContainer, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sortContainer, createTripSortTemplate(), RenderPosition.BEFOREEND);
sortContainer.appendChild(eventList);
renderTemplate(eventList, createPointEditTemplate(points[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT - 1; i++) {
  renderTemplate(eventList, createPointTemplate(points[i]), RenderPosition.BEFOREEND);
}

renderTemplate(eventList, createPointAddTemplate(points[points.length - 1]), RenderPosition.BEFOREEND);


