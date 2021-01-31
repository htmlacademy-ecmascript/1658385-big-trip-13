import {render, replace, remove} from '../utils/render';
import PointView from '../view/point';
import EditPointView from '../view/point-editor';
import {UpdateType, ActionType} from '../const';
import {isEqualTime} from '../utils/time';
import {isEqualOffers} from '../utils/common';

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
    this._handleDeletePoint = this._handleDeletePoint.bind(this);
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
    this._editPointComponent.setDeleteClickHandler(this._handleDeletePoint);

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
    document.removeEventListener(`keydown`, this._keyDownHandler);
    replace(this._pointComponent, this._editPointComponent);
    this._mode = Mode.DEFAULT;
  }

  _keyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._editPointComponent.reset(this._point);
      this._replaceFormToPoint();
    }
  }

  _handleFormRollupButtonClick() {
    document.addEventListener(`keydown`, this._keyDownHandler);
    this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        ActionType.UPDATE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        ));
  }

  _handleFormSubmit(point) {
    const updateType = (point.price !== this._point.price || !isEqualTime(point.times.start, this._point.times.start || !isEqualTime(point.times.end, this._point.times.end)) || point.destination !== this._point.destination || !isEqualOffers(point.offers, this._point.offers)) ? UpdateType.MINOR : UpdateType.PATCH;
    this._changeData(ActionType.UPDATE, updateType, point);
    this._replaceFormToPoint();
  }

  _handleDeletePoint(point) {
    this._changeData(ActionType.DELETE, UpdateType.MAJOR, point);
  }

  _handlePointRollupButtonClick() {
    this._replaceFormToPoint();
  }
}
