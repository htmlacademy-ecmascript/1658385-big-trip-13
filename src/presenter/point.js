import {render, replace, remove} from '../utils/render';
import PointView from '../view/point';
import EditPointView from '../view/point-editor';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointPresenter {
  constructor(pointsListElement, changeData, changeMode) {
    this._pointsListElement = pointsListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._editPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._handleFormRollupButtonClick = this._handleFormRollupButtonClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePointRollupButtonClick = this._handlePointRollupButtonClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new PointView(point);
    this._editPointComponent = new EditPointView(point);

    this._pointComponent.setRollupButtonClickHandler(this._handleFormRollupButtonClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent.setRollupButtonClickHandler(this._handlePointRollupButtonClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointsListElement, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    this._changeMode();
    replace(this._editPointComponent, this._pointComponent);
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._editPointComponent);
    this._mode = Mode.DEFAULT;
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

  _handleFavoriteClick() {
    this._point.isFavorite = !this._point.isFavorite;
    this._changeData(this._point);
  }

  _handleFormSubmit(task) {
    document.removeEventListener(`keydown`, this._keyDownHandler);
    this._changeData(task);
    this._replaceFormToPoint();
  }

  _handlePointRollupButtonClick() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._keyDownHandler);
  }
}
