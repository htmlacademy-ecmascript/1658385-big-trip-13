import {render, replace} from '../utils/render';
import PointView from '../view/point';
import EditPointView from '../view/point-editor';

export default class PointPresenter {
  constructor(pointsListElement) {
    this._pointsListElement = pointsListElement;

    this._pointComponent = null;
    this._editPointComponent = null;

    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._editPointComponent = new EditPointView(point);

    this._pointComponent.setRollupButtonClickHandler(() => {
      document.addEventListener(`keydown`, this._keyDownHandler);
      this._replacePointToForm();
    });

    this._editPointComponent.setFormSubmitHandler(() => {
      document.removeEventListener(`keydown`, this._keyDownHandler);
      this._replaceFormToPoint();
    });

    this._editPointComponent.setRollupButtonClickHandler(() => {
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._keyDownHandler);
    });

    render(this._pointsListElement, this._pointComponent);
  }

  _replacePointToForm() {
    replace(this._editPointComponent, this._pointComponent);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._editPointComponent);
  }


  _keyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._keyDownHandler);
    }
  }
}
