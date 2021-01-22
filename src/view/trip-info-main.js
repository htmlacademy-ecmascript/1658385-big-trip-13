import AbstractView from './abstract';

const createTripInfoMainTemplate = (route, dates) => {
  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  `;
};

export default class TripInfoMainView extends AbstractView {
  constructor(route, dates) {
    super();

    this._route = route;
    this._dates = dates;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._route, this._dates);
  }
}
