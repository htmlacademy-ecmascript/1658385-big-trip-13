import TripInfoMainView from './view/trip-info-main';
import TripInfoCostView from './view/trip-info-cost';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortingView from './view/sorting';
import EditPointView from './view/point-editor';
import PointView from './view/point';
import {generatePoint} from './mock/point';
import {render, RenderPosition} from './utils';

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

const renderPoint = (container, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replacePointToForm = () => {
    container.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    container.replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replacePointToForm();
  });

  editPointComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(container, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

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

const route = getTripRoute(points);
const dates = getTripDates(points);
render(tripInfoElement, new TripInfoMainView(route, dates).getElement(), RenderPosition.BEFOREEND);

const cost = calcTripCost(points);
render(tripInfoElement, new TripInfoCostView(cost).getElement(), RenderPosition.BEFOREEND);

render(menuContainerElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(filtersContainerElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

render(tripEventsHeaderElement, new SortingView().getElement(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < POINTS_AMOUNT; i++) {
  renderPoint(pointsListElement, points[i], RenderPosition.BEFOREEND);
}
