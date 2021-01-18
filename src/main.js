import TripInfoMainView from './view/trip-info-main';
import TripInfoCostView from './view/trip-info-cost';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortingView from './view/sorting';
import EditPointView from './view/point-editor';
import PointView from './view/point';
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
renderElement(tripInfoElement, new TripInfoMainView(route, dates).getElement(), RenderPosition.BEFOREEND);

const cost = calcTripCost(points);
renderElement(tripInfoElement, new TripInfoCostView(cost).getElement(), RenderPosition.BEFOREEND);

renderElement(menuContainerElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(filtersContainerElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

renderElement(tripEventsHeaderElement, new SortingView().getElement(), RenderPosition.AFTERBEGIN);

renderElement(pointsListElement, new EditPointView(points[0]).getElement(), RenderPosition.BEFOREEND);
for (let i = 1; i < POINTS_AMOUNT; i++) {
  renderElement(pointsListElement, new PointView(points[i]).getElement(), RenderPosition.BEFOREEND);
}
