import PointsModel from "../model/points.js";
import DestinationModel from '../model/destinations';
import OffersModel from '../model/offers';
import {STORE_KEYS} from "../const";

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isNotSynced = false;
  }

  getIsNotSynced() {
    return this._isNotSynced;
  }

  getPoints() {
    if (this._getIsOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(STORE_KEYS.POINTS, items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(STORE_KEYS.POINTS));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  getDestinations() {
    if (this._getIsOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItems(STORE_KEYS.DESTINATIONS, destinations);
          return DestinationModel.adaptToClient(destinations);
        });
    }

    const storeDestinations = Object.values(this._store.getItems(STORE_KEYS.DESTINATIONS));
    return Promise.resolve(DestinationModel.adaptToClient(storeDestinations));
  }

  getOffers() {
    if (this._getIsOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItems(STORE_KEYS.OFFERS, offers);
          return OffersModel.adaptToClient(offers);
        });
    }

    const storeOffers = Object.values(this._store.getItems(STORE_KEYS.OFFERS));

    return Promise.resolve(OffersModel.adaptToClient(storeOffers));
  }

  updatePoint(point) {
    if (this._getIsOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(STORE_KEYS.POINTS, updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._isNotSynced = true;
    this._store.setItem(STORE_KEYS.POINTS, point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (this._getIsOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(STORE_KEYS.POINTS, newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    this._isNotSynced = true;
    this._store.setItem(STORE_KEYS.POINTS, point.id, PointsModel.adaptToServer(point));

    return Promise.resolve(point);
  }

  deletePoint(point) {
    if (this._getIsOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(STORE_KEYS.POINTS, point.id));
    }

    this._isNotSynced = true;
    this._store.removeItem(STORE_KEYS.POINTS, point.id);
    return Promise.resolve(point);
  }

  sync() {
    if (this._getIsOnline()) {
      this._isNotSynced = false;
      const storePoints = Object.values(this._store.getItems(STORE_KEYS.POINTS));
      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(STORE_KEYS.POINTS, items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _getIsOnline() {
    return window.navigator.onLine;
  }
}
