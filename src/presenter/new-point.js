import EditPointView from '../view/point-editor';
import {generateId} from '../mock/point';
import {render, RenderPosition, remove} from '../utils/render';
import {UpdateType, ActionType} from '../const';

export default class NewPointPresenter {
  constructor(pointsListElement, changeData, newEventButton) {
    this._pointsListElement = pointsListElement;
    this._changeData = changeData;
    this._newEventButton = newEventButton;

    this._editPointComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  init() {
    if (this._editPointComponent !== null) {
      return;
    }

    this._newEventButton.disabled = true;

    this._editPointComponent = new EditPointView();
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent.setDeleteClickHandler(this._handleCancelClick);

    render(this._pointsListElement, this._editPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._keyDownHandler);
  }

  destroy() {
    if (this._editPointComponent === null) {
      return;
    }

    remove(this._editPointComponent);
    this._editPointComponent = null;

    document.removeEventListener(`keydown`, this._keyDownHandler);

    this._newEventButton.disabled = false;
  }

  _handleFormSubmit(point) {
    this._changeData(
        ActionType.ADD,
        UpdateType.MAJOR,
        Object.assign(
            {id: generateId()},
            point
        )
    );

    this.destroy();
  }

  _handleCancelClick() {
    this.destroy();
  }

  _keyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
