import {render} from '../utils/render';
import FiltersView from '../view/filters';

export default class FiltersPresenter {
  constructor(filtersContainerElement) {
    this._filtersContainerElement = filtersContainerElement;
    this._filtersElement = new FiltersView();
  }

  init() {
    render(this._filtersContainerElement, this._filtersElement);
  }
}
