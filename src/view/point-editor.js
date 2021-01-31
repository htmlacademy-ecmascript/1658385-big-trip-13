import {OFFERS, TYPES, DESTINATIONS, destinationDescriptions} from '../mock/point';
import SmartView from './smart';
import flatpickr from "flatpickr";
import dayjs from 'dayjs';

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  type: `Taxi`,
  price: 20,
  destination: `Amsterdam`,
  offers: [],
  times: {
    start: dayjs(),
    end: dayjs().add(1, `hour`)
  },
  isFavorite: false
};

const createTypeChoiceTemplate = (chosenType) => {
  return `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
        ${TYPES.map((type) => `
          <div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === chosenType ? `checked` : ``}>
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
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name.toLowerCase().split(` `).join(`-`)}-1" type="checkbox" name="event-offer" ${pickedOffers.has(offer.name) ? `checked` : ``} value="${offer.name}">
            <label class="event__offer-label" for="event-offer-${offer.name.toLowerCase().split(` `).join(`-`)}-1">
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

const createEditPointTemplate = (data) => {
  const {isNewPoint, type, destination, times, price, pickedOffers, description, availableOffers, isThereAvailableOffers, isThereDescText, isThereDescPhotos, isThereDescription} = data;
  const typeChoiceTemplate = createTypeChoiceTemplate(type);
  const offersTemplate = isThereAvailableOffers ? createOffersTemplate(availableOffers, pickedOffers) : ``;
  const descTextTemplate = isThereDescText ? `<p class="event__destination-description">${description.text}</p>` : ``;
  const descPhotosTemplate = isThereDescPhotos ? createPhotosTemplate(description.photos) : ``;

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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1" pattern="${DESTINATIONS.join(`|`)}" title="Available destinations: ${DESTINATIONS.join(`, `)}">
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
            <input type="number" class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${isNewPoint
    ? `<button class="event__reset-btn" type="reset">Cancel</button>`
    : `<button class="event__reset-btn" type="reset">Delete</button>`}
          ${isNewPoint ? `` : `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`}
        </header>
        <section class="event__details">
          ${offersTemplate}

          ${isThereDescription ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${descTextTemplate}
            ${descPhotosTemplate}
            </div>
          </section>` : ``}
        </section>
      </form>
    </li>
  `;
};

export default class EditPointView extends SmartView {
  constructor(point = BLANK_POINT) {
    super();

    this._data = EditPointView.parsePointToData(point);
    this._datepicker = null;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChoiceHandler = this._typeChoiceHandler.bind(this);
    this._destinationChoiceHandler = this._destinationChoiceHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    if (!this._data.isNewPoint) {
      this.setRollupButtonClickHandler(this._callback.rollupButtonClick);
    }
  }

  reset(point) {
    this.updateData(
        EditPointView.parsePointToData(point)
    );
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.start.destroy();
      this._datepicker.end.destroy();
      this._datepicker = null;
    }
  }

  _setDatepickers() {
    if (this._datepicker) {
      this._datepicker.start.destroy();
      this._datepicker.end.destroy();
      this._datepicker = null;
    }

    const makeDatePickerConfig = (defaultDate, tresholdDate, tresholdType, isStart) => {
      return {
        'dateFormat': `d/m/y H:i`,
        defaultDate,
        [tresholdType]: tresholdDate,
        'enableTime': true,
        'time_24hr': true,
        'onChange': this._dateChangeHandler(isStart)
      };
    };

    this._datepicker = {
      start: flatpickr(
          this.getElement().querySelector(`input[name=event-start-time]`),
          makeDatePickerConfig(this._data.times.start.toDate(), this._data.times.end.toDate(), `maxDate`, true)
      ),
      end: flatpickr(
          this.getElement().querySelector(`input[name=event-end-time]`),
          makeDatePickerConfig(this._data.times.end.toDate(), this._data.times.start.toDate(), `minDate`, false)
      )
    };
  }

  _dateChangeHandler(isStart) {
    return ([userDate]) => {
      this.updateData({
        times: {
          start: isStart ? dayjs(userDate) : this._data.times.start,
          end: isStart ? this._data.times.end : dayjs(userDate)
        }
      });
    };
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._typeChoiceHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChoiceHandler);

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceChangeHandler);

    if (this._data.isThereAvailableOffers) {
      const offerButtons = this.getElement().querySelectorAll(`input[name=event-offer]`);
      for (const offerButton of offerButtons) {
        offerButton.addEventListener(`change`, this._offerToggleHandler);
      }
    }
  }

  _typeChoiceHandler(evt) {
    const availableOffers = EditPointView.getAvailableOffers(evt.target.value);
    this.updateData({
      type: evt.target.value,
      availableOffers,
      isThereAvailableOffers: !!availableOffers.length,
      pickedOffers: new Set()
    });
  }

  _destinationChoiceHandler(evt) {
    if (DESTINATIONS.includes(evt.target.value)) {
      this.updateData(
          Object.assign(
              {
                destination: evt.target.value
              },
              EditPointView.getDescFields(evt.target.value)
          )
      );
    }
  }

  _priceChangeHandler(evt) {
    const price = parseInt(evt.target.value, 10);
    if (price) {
      this.updateData({
        price
      }, true);
    }
  }

  _offerToggleHandler(evt) {
    const pickedOffers = new Set(this._data.pickedOffers);
    if (pickedOffers.has(evt.target.value)) {
      pickedOffers.delete(evt.target.value);
    } else {
      pickedOffers.add(evt.target.value);
    }
    this.updateData({
      pickedOffers
    });
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupButtonClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseDataToPoint(this._data));
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.delete(EditPointView.parseDataToPoint(this._data));
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  static getDescFields(destination) {
    const description = destinationDescriptions.get(destination);
    const isThereDescription = !!description;
    return {
      description,
      isThereDescription,
      isThereDescText: isThereDescription && !!description.text,
      isThereDescPhotos: !!description.photos.length
    };
  }

  static getAvailableOffers(type) {
    return OFFERS.slice().filter((offer) => offer.type === type);
  }

  static parsePointToData(point) {
    const isNewPoint = typeof point.id === `undefined`;
    const availableOffers = EditPointView.getAvailableOffers(point.type);
    const pickedOffers = new Set(point.offers.map((offer) => offer.name));
    const isThereAvailableOffers = !!availableOffers.length;
    return Object.assign(
        {},
        point,
        {
          isNewPoint,
          availableOffers,
          isThereAvailableOffers,
          pickedOffers
        },
        EditPointView.getDescFields(point.destination)
    );
  }

  static parseDataToPoint(data) {
    const point = Object.assign({}, data);
    point.offers = OFFERS.filter((offer) => data.pickedOffers.has(offer.name));
    delete point.availableOffers;
    delete point.isThereAvailableOffers;
    delete point.description;
    delete point.isThereDescription;
    delete point.isThereDescText;
    delete point.isThereDescPhotos;
    delete point.pickedOffers;

    return point;
  }
}
