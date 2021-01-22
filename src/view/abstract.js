import {createElement} from '../utils/render';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Do not create instances of Abstract class!`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Implement getTemplate method!`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
