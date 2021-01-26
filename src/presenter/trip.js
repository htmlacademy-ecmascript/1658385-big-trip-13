import {render, RenderPosition, replace} from '../utils/render';
import MenuView from '../view/menu';
import FiltersView from '../view/filters';
import SortingView from '../view/sorting';
import TripInfoCostView from '../view/trip-info-cost';
import TripInfoMainView from '../view/trip-info-main';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';

export default class TripPresenter {
  constructor(pointsListElement, tripInfoElement, menuContainerElement, filtersContainerElement, tripEventsHeaderElement) {
    this._pointsListElement = pointsListElement;
    this._tripInfoElement = tripInfoElement;
    this._menuContainerElement = menuContainerElement;
    this._filtersContainerElement = filtersContainerElement;
    this._tripEventsHeaderElement = tripEventsHeaderElement;
    this._pointPresenter = new Map();

    this._menuElement = new MenuView();
    this._filtersElement = new FiltersView();
    this._sortingElement = new SortingView();
    this._tripInfoMainElement = new TripInfoMainView();
    this._tripInfoCostElement = new TripInfoCostView();
    this._noPointsElement = new NoPointsView();
  }

  init(points) {
    this._points = points.slice();

    this._renderTrip();
  }

  _getTripRoute(points) {
    const destinations = [];
    points.forEach((point) => {
      const lastDestination = destinations.slice(-1)[0];
      if (point.destination !== lastDestination) {
        destinations.push(point.destination);
      }
    });

    return destinations.join(` &mdash; `);
  }

  _getTripDates(points) {
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
  }

  _calcTripCost(points) {
    return points.reduce((sum, point) => {
      return sum + point.price + point.offers.reduce((oSum, offer) => oSum + offer.price, 0);
    }, 0);
  }

  _renderTripInfo() {
    const route = this._getTripRoute(this._points);
    const dates = this._getTripDates(this._points);
    render(this._tripInfoElement, new TripInfoMainView(route, dates));

    const cost = this._calcTripCost(this._points);
    render(this._tripInfoElement, new TripInfoCostView(cost));
  }

  _renderMenu() {
    render(this._menuContainerElement, this._menuElement);
  }

  _renderFilters() {
    render(this._filtersContainerElement, this._filtersElement);
  }

  _renderSorting() {
    render(this._tripEventsHeaderElement, this._sortingElement, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    replace(this._noPointsElement, this._pointsListElement);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListElement);
    pointPresenter.init(point);
    this._pointPresenter.set(point, pointPresenter);
  }

  _renderPointsList() {
    for (const point of this._points) {
      this._renderPoint(point);
    }
  }

  _renderTrip() {
    this._renderTripInfo();
    this._renderMenu();
    this._renderFilters();
    this._renderSorting();

    if (this._points.length) {
      this._renderPointsList();
    } else {
      this._renderNoPoints();
    }
  }

  _clearPointsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter = new Map();
  }
}
