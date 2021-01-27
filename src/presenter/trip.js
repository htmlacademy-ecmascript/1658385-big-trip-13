import {render, RenderPosition, replace} from '../utils/render';
import {updatePoint} from '../utils/common';
import MenuView from '../view/menu';
import FiltersView from '../view/filters';
import SortingView from '../view/sorting';
import TripInfoCostView from '../view/trip-info-cost';
import TripInfoMainView from '../view/trip-info-main';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {SortType} from '../const';

export default class TripPresenter {
  constructor(pointsListElement, tripInfoElement, menuContainerElement, filtersContainerElement, tripEventsHeaderElement) {
    this._pointsListElement = pointsListElement;
    this._tripInfoElement = tripInfoElement;
    this._menuContainerElement = menuContainerElement;
    this._filtersContainerElement = filtersContainerElement;
    this._tripEventsHeaderElement = tripEventsHeaderElement;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._menuElement = new MenuView();
    this._filtersElement = new FiltersView();
    this._sortingElement = new SortingView();
    this._tripInfoMainElement = new TripInfoMainView();
    this._tripInfoCostElement = new TripInfoCostView();
    this._noPointsElement = new NoPointsView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();

    this._sortPoints(this._currentSortType);

    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updatePoint(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint).init(updatedPoint);
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

  _sortPointsByDay(pointA, pointB) {
    return pointA.times.start.diff(pointB.times.start);
  }

  _sortPointsByTime(pointA, pointB) {
    return pointB.times.end.diff(pointB.times.start) - pointA.times.end.diff(pointA.times.start);
  }

  _sortPointsByPrice(pointA, pointB) {
    return pointB.price - pointA.price;
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._points.sort(this._sortPointsByTime);
        break;
      case SortType.PRICE:
        this._points.sort(this._sortPointsByPrice);
        break;
      default:
        this._points.sort(this._sortPointsByDay);
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointsList();
    this._renderPointsList();
  }

  _renderSorting() {
    render(this._pointsListElement, this._sortingElement, RenderPosition.AFTERBEGIN);
    this._sortingElement._setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoPoints() {
    replace(this._noPointsElement, this._pointsListElement);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListElement, this._handlePointChange, this._handleModeChange);
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
