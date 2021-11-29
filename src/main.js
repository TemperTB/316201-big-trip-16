import { renderTemplate, RenderPosition } from './render.js';
import { generatePoint } from './mock/point.js';
import { createTripTabsTemplate } from './view/trip-tabs-view.js';
import { createTripFiltersTemplate } from './view/trip-filters-view.js';
import { createTripSortTemplate } from './view/trip-sort-view.js';
import { createPointAddTemplate } from './view/point-add-view';
import { createPointEditTemplate } from './view/point-edit-view';
import { createPointTemplate } from './view/point-view';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const eventList = document.createElement('ul');
eventList.classList.add('trip-events__list');

renderTemplate(menuContainer, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterContainer, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sortContainer, createTripSortTemplate(), RenderPosition.BEFOREEND);
sortContainer.appendChild(eventList);

const POINT_COUNT= 20;
const points = [];
for (let i = 0; i < POINT_COUNT; i++) {
  points[i] = generatePoint();
}

renderTemplate(eventList, createPointEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 1; i <= 3; i++) {
  renderTemplate(eventList, createPointTemplate(points[i]), RenderPosition.BEFOREEND);
}

renderTemplate(eventList, createPointAddTemplate(), RenderPosition.BEFOREEND);

console.log(points);

