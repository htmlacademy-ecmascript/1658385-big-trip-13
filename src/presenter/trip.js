import {render, RenderPosition, replace, remove} from '../utils/render';
import MenuView from '../view/menu';
import SortingView from '../view/sorting';
import TripInfoCostView from '../view/trip-info-cost';
import TripInfoMainView from '../view/trip-info-main';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {SortType} from '../const';
import {filter} from '../utils/filter';

export default class TripPresenter {
  constructor(pointsModel, filtersModel, pointsListElement, tripInfoElement, menuContainerElement, tripEventsHeaderElement) {
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._pointsListElement = pointsListElement;
    this._tripInfoElement = tripInfoElement;
    this._menuContainerElement = menuContainerElement;
    this._tripEventsHeaderElement = tripEventsHeaderElement;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._menuElement = new MenuView();
    this._sortingElement = null;
    this._tripInfoMainElement = new TripInfoMainView();
    this._tripInfoCostElement = new TripInfoCostView();
    this._noPointsElement = new NoPointsView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    const filterName = this._filtersModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterName](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        filteredPoints.sort(this._sortPointsByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(this._sortPointsByPrice);
        break;
      default:
        filteredPoints.sort(this._sortPointsByDay);
    }

    return filteredPoints;
  }

  _handleModelEvent() {
    this._clearPointsList();
    this._renderPointsList();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._pointsModel.updatePoint(updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  static getTripRoute(points) {
    let destinations = [];
    points.forEach((point) => {
      const lastDestination = destinations.slice(-1)[0];
      if (point.destination !== lastDestination) {
        destinations.push(point.destination);
      }
    });

    if (destinations.length > 3) {
      destinations = [destinations[0], `...`, destinations.pop()];
    }

    return destinations.join(` &mdash; `);
  }

  static getTripDates(points) {
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

  static calcTripCost(points) {
    return points.reduce((sum, point) => {
      return sum + point.price + point.offers.reduce((oSum, offer) => oSum + offer.price, 0);
    }, 0);
  }

  _renderTripInfo() {
    const points = this._getPoints();
    const route = TripPresenter.getTripRoute(points);
    const dates = TripPresenter.getTripDates(points);
    render(this._tripInfoElement, new TripInfoMainView(route, dates));

    const cost = TripPresenter.calcTripCost(points);
    render(this._tripInfoElement, new TripInfoCostView(cost));
  }

  _renderMenu() {
    render(this._menuContainerElement, this._menuElement);
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

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearPointsList();
    this._renderSorting();
    this._renderPointsList();
  }

  _renderSorting() {
    const prevSortingElement = this._sortingElement;

    this._sortingElement = new SortingView(this._currentSortType);
    this._sortingElement._setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevSortingElement === null) {
      render(this._pointsListElement, this._sortingElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._sortingElement, prevSortingElement);
    remove(prevSortingElement);
  }

  _renderNoPoints() {
    replace(this._noPointsElement, this._pointsListElement);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListElement, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPointsList() {
    for (const point of this._getPoints()) {
      this._renderPoint(point);
    }
  }

  _renderTrip() {
    this._renderTripInfo();
    this._renderMenu();
    this._renderSorting();

    if (this._getPoints().length) {
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
