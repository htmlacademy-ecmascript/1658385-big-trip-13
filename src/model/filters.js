import Observer from '../utils/observer';
import {FilterType} from '../const';

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, newFilter) {
    this._activeFilter = newFilter;

    this._notify(updateType, newFilter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
