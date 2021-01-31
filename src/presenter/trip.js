import {render, RenderPosition, replace, remove} from '../utils/render';
import MenuView from '../view/menu';
import SortingView from '../view/sorting';
import TripInfoCostView from '../view/trip-info-cost';
import TripInfoMainView from '../view/trip-info-main';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {SortType, UpdateType, ActionType, FilterType} from '../const';
import {filter} from '../utils/filter';
import {sortPointsByTime, sortPointsByPrice, sortPointsByDay} from '../utils/sort';
import NewPointPresenter from './new-point';

export default class TripPresenter {
  constructor(pointsModel, filtersModel, tripEventsElement, pointsListElement, tripInfoElement, menuContainerElement) {
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._tripEventsElement = tripEventsElement;
    this._pointsListElement = pointsListElement;
    this._tripInfoElement = tripInfoElement;
    this._menuContainerElement = menuContainerElement;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._menuElement = new MenuView();
    this._sortingElement = null;
    this._tripInfoMainElement = null;
    this._tripInfoCostElement = null;
    this._noPointsElement = new NoPointsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewPointPresenter(this._pointsListElement, this._handleViewAction);
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
        filteredPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortPointsByPrice);
        break;
      default:
        filteredPoints.sort(sortPointsByDay);
    }

    return filteredPoints;
  }

  createPoint() {
    this._filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._currentSortType = SortType.DAY;
    this._renderSorting();
    this._newPointPresenter.init();
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._pointPresenter.get(data.id).init(data);
        this._renderTripInfo();
        break;
      case UpdateType.MAJOR:
        this._clearPointsList();
        this._renderTripInfo();
        this._renderPointsList();
        break;
    }
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, updatedPoint) {
    switch (actionType) {
      case ActionType.UPDATE:
        this._pointsModel.updatePoint(updateType, updatedPoint);
        break;
      case ActionType.DELETE:
        this._pointsModel.deletePoint(updateType, updatedPoint);
        break;
      case ActionType.ADD:
        this._pointsModel.addPoint(updateType, updatedPoint);
        break;
    }
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
    const prevTripInfoMainElement = this._tripInfoMainElement;

    const points = this._getPoints();
    const route = TripPresenter.getTripRoute(points);
    const dates = TripPresenter.getTripDates(points);
    this._tripInfoMainElement = new TripInfoMainView(route, dates);

    if (prevTripInfoMainElement === null) {
      render(this._tripInfoElement, this._tripInfoMainElement);
    } else {
      replace(this._tripInfoMainElement, prevTripInfoMainElement);
      remove(prevTripInfoMainElement);
    }

    const prevTripInfoCostElement = this._tripInfoCostElement;

    const cost = TripPresenter.calcTripCost(points);
    this._tripInfoCostElement = new TripInfoCostView(cost);
    if (prevTripInfoCostElement === null) {
      render(this._tripInfoElement, this._tripInfoCostElement);
    } else {
      replace(this._tripInfoCostElement, prevTripInfoCostElement);
      remove(prevTripInfoCostElement);
    }
  }

  _renderMenu() {
    render(this._menuContainerElement, this._menuElement);
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
      render(this._tripEventsElement, this._sortingElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._sortingElement, prevSortingElement);
    remove(prevSortingElement);
  }

  _renderNoPoints() {
    replace(this._noPointsElement, this._pointsListElement);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListElement, this._handleViewAction, this._handleModeChange);
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
    this._newPointPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter = new Map();
  }
}
