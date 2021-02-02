import {capitalizeFirstLetter} from '../utils/common';

export default class OffersModel {
  constructor() {
    this._offers = [];
  }

  set offers(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }

  static adaptToClient(offers) {
    const adaptedOffers = [];
    offers.forEach((groupedByType) => {
      groupedByType.offers.forEach((offer) => {
        adaptedOffers.push({
          type: capitalizeFirstLetter(groupedByType.type),
          name: offer.title,
          price: offer.price
        });
      });
    });
    return adaptedOffers;
  }
}
