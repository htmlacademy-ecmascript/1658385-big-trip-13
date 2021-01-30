import {render} from '../utils/render';
import FiltersView from '../view/filters';

export default class FiltersPresenter {
  constructor(filtersModel, filtersContainerElement) {
    this._filtersModel = filtersModel;
    this._filtersContainerElement = filtersContainerElement;
    this._currentFilter = null;
  }

  init() {
    this._currentFilter = this._filtersModel.getFilter();
    this._filtersElement = new FiltersView(this._getFilters(), this._currentFilter);
    render(this._filtersContainerElement, this._filtersElement);
  }

  _getFilters() {
    return [
      `everything`,
      `future`,
      `past`
    ];
  }
}
