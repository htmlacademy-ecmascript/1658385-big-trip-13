import {OFFERS, TYPES, DESTINATIONS} from '../mock/point';
import SmartView from './smart';

const createTypeChoiceTemplate = (chosenType) => {
  return `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
        ${TYPES.map((type) => `
        <div class="event__type-item">
          <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${type === chosenType ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
        </div>
      `).join(``)}
    </fieldset>
  `;
};

const createOffersTemplate = (availableOffers, pickedOffers) => {
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${availableOffers.map((offer) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name.toLowerCase().split(` `).join(`-`)}-1" type="checkbox" name="event-offer-${offer.name.split(` `).join(`-`)}" ${pickedOffers.map((o) => o.name).includes(offer.name) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${offer.name.split(` `).join(`-`)}-1">
              <span class="event__offer-title">${offer.name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `).join(``)}
      </div>
    </section>
  `;
};

const createPhotosTemplate = (photos) => {
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map((photo) => `
          <img class="event__photo" src=${photo} alt="Event photo">
        `).join(``)}
      </div>
    </div>
  `;
};

const createEditPointTemplate = (point = {}) => {
  const {type, destination, times, price, offers, description} = point;
  const typeChoiceTemplate = createTypeChoiceTemplate(type);

  const availableOffers = OFFERS.slice().filter((offer) => offer.type === type);
  const isThereAvailableOffers = !!availableOffers.length;
  const offersTemplate = isThereAvailableOffers ? createOffersTemplate(availableOffers, offers) : ``;

  const isThereDescriptionText = !!description.text;
  const isTherePhotos = !!description.photos.length;
  const photosTemplate = isTherePhotos ? createPhotosTemplate(description.photos) : ``;

  const isThereDescription = isThereDescriptionText || isTherePhotos;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${typeChoiceTemplate}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
            <datalist id="destination-list-1">
              ${DESTINATIONS.map((destinationToChose) => `
                <option value=${destinationToChose}></option>
              `).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${times.start.format(`DD/MM/YY HH:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${times.end.format(`DD/MM/YY HH:mm`)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}

          ${isThereDescription ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${isThereDescriptionText ? `<p class="event__destination-description">${description.text}</p>` : ``}

            ${photosTemplate}
            </div>
          </section>` : ``}
        </section>
      </form>
    </li>
  `;
};

export default class EditPointView extends SmartView {
  constructor(point) {
    super();

    this._point = point;
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEditPointTemplate(this._point);
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupButtonClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
