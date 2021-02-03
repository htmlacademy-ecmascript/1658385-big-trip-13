import {render, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';
import FiltersView from '../view/filters';
import {UpdateType} from '../const';

const FILTERS = [
  `everything`,
  `future`,
  `past`
];

export default class FiltersPresenter {
  constructor(filtersModel, filtersContainerElement, pointsModel) {
    this._filtersModel = filtersModel;
    this._pointsModel = pointsModel;
    this._filtersElement = null;
    this._filtersContainerElement = filtersContainerElement;
    this._currentFilter = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filtersModel.getFilter();

    const prevFiltersElement = this._filtersElement;

    this._filtersElement = new FiltersView(this._getFilters(), this._getDisabledFilters(), this._currentFilter);
    this._filtersElement.setFilterChangeHandler(this._handleFilterChange);

    if (prevFiltersElement === null) {
      render(this._filtersContainerElement, this._filtersElement);
      return;
    }

    replace(this._filtersElement, prevFiltersElement);
    remove(prevFiltersElement);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterChange(newFilter) {
    if (this._currentFilter === newFilter) {
      return;
    }

    this._filtersModel.setFilter(UpdateType.MAJOR, newFilter);
  }

  _getFilters() {
    return FILTERS;
  }

  _getDisabledFilters() {
    return FILTERS.filter((filterName) => filter[filterName](this._pointsModel.getPoints()).length === 0);
  }
}
