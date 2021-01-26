import {render, replace, remove} from '../utils/render';
import PointView from '../view/point';
import EditPointView from '../view/point-editor';

export default class PointPresenter {
  constructor(pointsListElement) {
    this._pointsListElement = pointsListElement;

    this._pointComponent = null;
    this._editPointComponent = null;

    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._handleFormRollupButtonClick = this._handleFormRollupButtonClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePointRollupButtonClick = this._handlePointRollupButtonClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new PointView(point);
    this._editPointComponent = new EditPointView(point);

    this._pointComponent.setRollupButtonClickHandler(this._handleFormRollupButtonClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent.setRollupButtonClickHandler(this._handlePointRollupButtonClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointsListElement, this._pointComponent);
      return;
    }

    if (this._pointsListElement.contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointsListElement.contains(prevEditPointComponent.getElement())) {
      replace(this._editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
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

  _handleFormRollupButtonClick() {
    document.addEventListener(`keydown`, this._keyDownHandler);
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    document.removeEventListener(`keydown`, this._keyDownHandler);
    this._replaceFormToPoint();
  }

  _handlePointRollupButtonClick() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._keyDownHandler);
  }
}
