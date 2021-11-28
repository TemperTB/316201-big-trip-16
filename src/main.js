import { renderTemplate, RenderPosition } from './render.js';
import { createTripTabsTemplate } from './view/trip-tabs.js';
import { createTripFiltersTemplate } from './view/trip-filters.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createEventAddTemplate } from './view/event-add';
import { createEventEditTemplate } from './view/event-edit';
import { createEventTemplate } from './view/event';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');

const eventList = document.createElement('ul');
eventList.classList.add('trip-events__list');

renderTemplate(menuContainer, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterContainer, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sortContainer, createTripSortTemplate(), RenderPosition.BEFOREEND);
sortContainer.appendChild(eventList);
renderTemplate(eventList, createEventEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 1; i <= 3; i++) {
  renderTemplate(eventList, createEventTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(eventList, createEventAddTemplate(), RenderPosition.BEFOREEND);


