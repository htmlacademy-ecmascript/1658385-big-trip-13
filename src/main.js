import TripInfoMainView from './view/trip-info-main';
import TripInfoCostView from './view/trip-info-cost';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortingView from './view/sorting';
import EditPointView from './view/point-editor';
import PointView from './view/point';
import NoPointsView from './view/no-points';
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
  if (!points.length) {
    return ``;
  }

  let {start, end} = points[0].times;
  points.forEach((point) => {
    if (point.times.start.diff(start) < 0) {
      start = point.times.start;
    }
    if (point.times.end.diff(end) > 0) {
      end = point.times.end;
    }
  });

  return start.month() === end.month()
    ? `${start.format(`MMM D`).toUpperCase()}&nbsp;&mdash;&nbsp;${end.date()}`
    : `${start.format(`MMM D`).toUpperCase()}&nbsp;&mdash;&nbsp;${end.format(`MMM D`).toUpperCase()}`;
};

export const calcTripCost = (points) => {
  return points.reduce((sum, point) => {
    return sum + point.price + point.offers.reduce((oSum, offer) => oSum + offer.price, 0);
  }, 0);
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

  const keyDownHandler = (evt) => {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, keyDownHandler);
    }
  };

  pointComponent.setRollupButtonClickHandler(() => {
    document.addEventListener(`keydown`, keyDownHandler);
    replacePointToForm();
  });

  editPointComponent.setFormSubmitHandler(() => {
    document.removeEventListener(`keydown`, keyDownHandler);
    replaceFormToPoint();
  });

  editPointComponent.setRollupButtonClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, keyDownHandler);
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

if (POINTS_AMOUNT > 0) {
  for (let i = 0; i < POINTS_AMOUNT; i++) {
    renderPoint(pointsListElement, points[i], RenderPosition.BEFOREEND);
  }
} else {
  tripEventsElement.replaceChild(new NoPointsView().getElement(), pointsListElement);
}

