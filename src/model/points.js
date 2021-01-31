import Observer from "../utils/observer";
import {updatePoint} from '../utils/common';

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
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
}
