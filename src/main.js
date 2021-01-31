import {generatePoint} from './mock/point';
import FilterPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
import FiltersModel from './model/filters';
import PointsModel from './model/points';

const POINTS_AMOUNT = 30;

const points = new Array(POINTS_AMOUNT).fill().map(generatePoint);

const pageBodyElement = document.querySelector(`.page-body`);
const pageHeaderElement = pageBodyElement.querySelector(`.page-header`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);

const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const menuContainerElement = tripControlsElement.querySelector(`.menu-container`);
const filtersContainerElement = tripControlsElement.querySelector(`.filters-container`);

const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const pointsListElement = tripEventsElement.querySelector(`.trip-events__list`);

const newEventButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filtersModel = new FiltersModel();
const filtersPresenter = new FilterPresenter(filtersModel, filtersContainerElement);

const tripPresenter = new TripPresenter(pointsModel, filtersModel, tripEventsElement, pointsListElement, tripInfoElement, menuContainerElement, newEventButton);

filtersPresenter.init();
tripPresenter.init();

newEventButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
