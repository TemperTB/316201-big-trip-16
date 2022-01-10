import { renderElement, RenderPosition, removeComponent } from './utils/render.js';
import { generatePoint } from './mock/point.js';
import { TripTabsView } from './view/trip-tabs-view.js';
import { TripPresenter } from './presenter/trip-presenter.js';
import { FilterPresenter } from './presenter/filter-presenter.js';
import { PointsModel } from './model/points-model.js';
import { FilterModel } from './model/filter-model.js';
import { StatsView } from './view/stats-view.js';
import { MenuItem } from './const.js';


const POINT_COUNT = 15;
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.page-body__page-main').querySelector('.page-body__container');

const filterModel = new FilterModel();

const points = [];
for (let i = 0; i < POINT_COUNT; i++) {
  points[i] = generatePoint();
}

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel);
tripPresenter.init();

const siteMenuComponent = new TripTabsView();
renderElement(menuContainer, siteMenuComponent, RenderPosition.BEFOREEND);

let statisticsComponent = null;

const onSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      if (siteMenuComponent.isActive(MenuItem.TABLE)) {
        break;
      }
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      filterPresenter.init();
      tripPresenter.init();
      removeComponent(statisticsComponent);
      break;
    case MenuItem.STATS:
      if (siteMenuComponent.isActive(MenuItem.STATS)) {
        break;
      }
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      filterPresenter.destroy();
      tripPresenter.destroy();
      statisticsComponent = new StatsView(pointsModel.points);
      renderElement(tripContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};
siteMenuComponent.setOnMenuClick(onSiteMenuClick);


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createTask();
});


