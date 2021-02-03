import FilterPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import PointsModel from './model/points';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import MenuView from './view/menu';
import StatsView from './view/stats';
import {render, remove} from './utils/render';
import {TabType, UpdateType} from './const';
import Api from './api';

const AUTHORIZATION = `Basic lds3o1r4asd13kd`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const pageBodyElement = document.querySelector(`.page-body`);
const pageHeaderElement = pageBodyElement.querySelector(`.page-header`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);

const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const menuContainerElement = tripControlsElement.querySelector(`.menu-container`);
const filtersContainerElement = tripControlsElement.querySelector(`.filters-container`);

const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);

const newEventButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);

const renderMenu = (container) => {
  const menuElement = new MenuView();
  render(container, menuElement);

  const handleMenuClick = (tab) => {
    menuElement.setActiveTab(tab);
    switch (tab) {
      case TabType.TABLE:
        remove(statsElement);
        tripPresenter.init(newEventButton, destinationsModel, offersModel);
        break;
      case TabType.STATS:
        tripPresenter.destroy();
        statsElement = new StatsView(pointsModel.getPoints());
        render(pageBodyContainerElement, statsElement);
        break;
    }
  };

  menuElement.setMenuClickHandler(handleMenuClick);
};

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const filtersModel = new FiltersModel();
const filtersPresenter = new FilterPresenter(filtersModel, filtersContainerElement);

const tripPresenter = new TripPresenter(pointsModel, filtersModel, tripEventsElement, tripMainElement, api);

let statsElement = null;

tripPresenter.init(newEventButton, destinationsModel, offersModel);

Promise.all([
  api.getPoints(), api.getDestinations(), api.getOffers()
])
  .then(([points, descriptions, offers]) => {
    destinationsModel.descriptions = descriptions;
    offersModel.offers = offers;
    pointsModel.setPoints(UpdateType.INIT, points);
    renderMenu(menuContainerElement);
    filtersPresenter.init();
    newEventButton.disabled = false;
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    renderMenu(menuContainerElement);
    filtersPresenter.init();
    newEventButton.disabled = false;
  });

newEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});
