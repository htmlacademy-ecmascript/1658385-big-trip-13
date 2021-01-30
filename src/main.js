import {generatePoint} from './mock/point';
import FilterPresenter from './presenter/filters';
import TripPresenter from './presenter/trip';
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
const tripEventsHeaderElement = tripEventsElement.querySelector(`h2`);
const pointsListElement = tripEventsElement.querySelector(`.trip-events__list`);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filtersPresenter = new FilterPresenter(filtersContainerElement);
filtersPresenter.init();

const tripPresenter = new TripPresenter(pointsModel, pointsListElement, tripInfoElement, menuContainerElement, tripEventsHeaderElement);

tripPresenter.init();
