import Observer from '../utils/observer';
import {FilterType} from '../const';

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(newFilter) {
    this._activeFilter = newFilter;

    this._notify();
  }

  getFilter() {
    return this._activeFilter;
  }
}
