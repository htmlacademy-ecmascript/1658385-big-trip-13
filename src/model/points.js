import Observer from "../utils/observer";
import {updatePoint, capitalizeFirstLetter} from '../utils/common';
import dayjs from "dayjs";

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, updatedPoint) {
    const index = this._points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error(`Can't find point to update`);
    }

    this._points = updatePoint(this._points, updatedPoint);

    this._notify(updateType, updatedPoint);
  }

  deletePoint(updateType, deletedPoint) {
    const index = this._points.findIndex((point) => point.id === deletedPoint.id);

    if (index === -1) {
      throw new Error(`Can't find point to delete`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  addPoint(updateType, addedPoint) {
    this._points = [
      addedPoint,
      ...this._points
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const type = capitalizeFirstLetter(point.type);

    return {
      id: point.id,
      type,
      price: point.base_price,
      destination: point.destination.name,
      description: {
        text: point.destination.description,
        photos: point.destination.pictures.map((picture) => picture.src)
      },
      offers: point.offers.map((offer) => {
        return {
          type,
          name: offer.title,
          price: offer.price
        };
      }),
      times: {
        start: dayjs(point.date_from),
        end: dayjs(point.date_to)
      },
      isFavorite: point.is_favorite
    };
  }

  static adaptToServer(point) {
    return {
      'id': point.id,
      'type': point.type.toLowerCase(),
      'date_from': point.times.start.toISOString(),
      'date_to': point.times.end.toISOString(),
      'destination': {
        'name': point.destination,
        'description': point.description.text,
        'pictures': point.description.photos.map((photo) => {
          return {
            'src': photo,
            'description': photo
          };
        })
      },
      'base_price': point.price,
      'is_favorite': point.isFavorite,
      'offers': point.offers.map((offer) => {
        return {
          'title': offer.name,
          'price': offer.price
        };
      })
    };
  }
}
