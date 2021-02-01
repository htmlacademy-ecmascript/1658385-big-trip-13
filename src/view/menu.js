import AbstractView from './abstract';
import {TabType} from '../const';

const createMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-tab="${TabType.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-tab="${TabType.STATS}">Stats</a>
    </nav>
  `;
};

export default class MenuView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.tab);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setActiveTab(tab) {
    const tabLinks = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    for (const tablink of tabLinks) {
      if (tablink.dataset.tab === tab) {
        tablink.classList.add(`trip-tabs__btn--active`);
      } else {
        tablink.classList.remove(`trip-tabs__btn--active`);
      }
    }
  }
}
