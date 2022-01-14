import { renderElement, RenderPosition, removeComponent } from './utils/render.js';
import { TripTabsView } from './view/trip-tabs-view.js';
import { TripPresenter } from './presenter/trip-presenter.js';
import { FilterPresenter } from './presenter/filter-presenter.js';
import { PointsModel } from './model/points-model.js';
import { OffersModel } from './model/offers-model.js';
import { DestinationsModel } from './model/destinations-model.js';
import { FilterModel } from './model/filter-model.js';
import { StatsView } from './view/stats-view.js';
import { MenuItem } from './const.js';
import { ApiService } from './api-service.js';

const AUTHORIZATION = 'Basic dwadawdwadnbgcmjghfljhk';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.page-body__page-main').querySelector('.page-body__container');

const filterModel = new FilterModel();
const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new ApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel, offersModel, destinationsModel);

const siteMenuComponent = new TripTabsView();

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

renderElement(menuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
filterPresenter.init();
tripPresenter.init();
pointsModel.init();
