import AbstractView from "./abstract";

export default class SmartView extends AbstractView {
  constructor() {
    super();

    this._data = {};
  }

  restoreHandlers() {
    throw new Error(`Implement restoreHandlers method!`);
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  updateData(updatedData, onlyUpdateData) {
    if (!updatedData) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        updatedData
    );

    if (onlyUpdateData) {
      return;
    }

    this.updateElement();
  }
}
