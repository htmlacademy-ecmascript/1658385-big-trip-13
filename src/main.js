import MenuView from './view/menu';
import FiltersView from './view/filters';
import {generatePoint} from './mock/point';
import {renderElement, RenderPosition} from './utils';

export const getTripRoute = (points) => {
  const destinations = [];
  points.forEach((point) => {
    const lastDestination = destinations.slice(-1)[0];
    if (point.destination !== lastDestination) {
      destinations.push(point.destination);
    }
  });

  return destinations.join(` &mdash; `);
};

export const getTripDates = (points) => {
  let {start, end} = points[0].times;
  points.forEach((point) => {
    if (point.times.start.diff(start) < 0) {
      start = point.times.start;
    }
    if (point.times.end.diff(end) > 0) {
      end = point.times.end;
    }
  });

  if (start.month() === end.month()) {
    return `${start.format(`MMM D`).toUpperCase()}&nbsp;&mdash;&nbsp;${end.date()}`;
  } else {
    return `${start.format(`MMM D`).toUpperCase()}&nbsp;&mdash;&nbsp;${end.format(`MMM D`).toUpperCase()}`;
  }
};

export const calcTripCost = (points) => {
  let cost = 0;
  points.forEach((point) => {
    cost += point.price;
    point.offers.forEach((offer) => {
      cost += offer.price;
    });
  });

  return cost;
};

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

const route = getTripRoute(points);
const dates = getTripDates(points);
render(tripInfoElement, createTripInfoMainTemplate(route, dates), `beforeend`);

const cost = calcTripCost(points);
render(tripInfoElement, createTripInfoCostTemplate(cost), `beforeend`);

renderElement(menuContainerElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(filtersContainerElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

render(tripEventsHeaderElement, createSortingTemplate(), `afterend`);

render(pointsListElement, createEditPointTemplate(points[0]), `beforeend`);
for (let i = 1; i < POINTS_AMOUNT; i++) {
  render(pointsListElement, createPointTemplate(points[i]), `beforeend`);
}
