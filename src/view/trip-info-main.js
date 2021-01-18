import {createElement} from '../utils';

const createTripInfoMainTemplate = (route, dates) => {
  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  `;
};

export default class TripInfoMainView {
  constructor(route, dates) {
    this._element = null;
    this._route = route;
    this._dates = dates;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._route, this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
