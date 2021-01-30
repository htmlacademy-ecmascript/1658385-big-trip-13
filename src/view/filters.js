import AbstractView from './abstract';

const createFilterTemplate = (filter, isChecked) => {
  return `
    <div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>
  `;
};

const createFiltersTemplate = (filters, currentFilter) => {
  return `
    <form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterTemplate(filter, filter === currentFilter)).join(``)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FiltersView extends AbstractView {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterChange(evt.target.value);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }
}
