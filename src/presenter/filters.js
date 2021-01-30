import {render, replace, remove} from '../utils/render';
import FiltersView from '../view/filters';

export default class FiltersPresenter {
  constructor(filtersModel, filtersContainerElement) {
    this._filtersModel = filtersModel;
    this._filtersElement = null;
    this._filtersContainerElement = filtersContainerElement;
    this._currentFilter = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filtersModel.getFilter();

    const prevFiltersElement = this._filtersElement;

    this._filtersElement = new FiltersView(this._getFilters(), this._currentFilter);
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

    this._filtersModel.setFilter(newFilter);
  }

  _getFilters() {
    return [
      `everything`,
      `future`,
      `past`
    ];
  }
}
