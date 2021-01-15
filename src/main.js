import {createTripInfoMainTemplate} from './view/trip-info-main';
import {createTripInfoCostTemplate} from './view/trip-info-cost';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortingTemplate} from './view/sorting';
import {createEditPointTemplate} from './view/point-editor';
import {createPointTemplate} from './view/point';
import {generatePoint} from './mock/point';

const POINTS_AMOUNT = 30;

const points = new Array(POINTS_AMOUNT).fill().map(generatePoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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

render(tripInfoElement, createTripInfoMainTemplate(), `beforeend`);
render(tripInfoElement, createTripInfoCostTemplate(), `beforeend`);

render(menuContainerElement, createMenuTemplate(), `beforeend`);
render(filtersContainerElement, createFiltersTemplate(), `beforeend`);

render(tripEventsHeaderElement, createSortingTemplate(), `afterend`);

render(pointsListElement, createEditPointTemplate(points[0]), `beforeend`);
for (let i = 1; i < POINTS_AMOUNT; i++) {
  render(pointsListElement, createPointTemplate(points[i]), `beforeend`);
}
