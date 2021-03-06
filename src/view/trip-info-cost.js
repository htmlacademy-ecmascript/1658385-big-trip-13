import AbstractView from './abstract';

const createTripInfoCostTemplate = (cost) => {
  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  `;
};

export default class TripInfoCostView extends AbstractView {
  constructor(cost) {
    super();

    this._cost = cost;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._cost);
  }
}
