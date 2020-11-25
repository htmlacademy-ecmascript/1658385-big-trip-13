import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteBodyElement.querySelector(`.page-header`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);

const menuAndFilters = [createMenuTemplate(), createFiltersTemplate()];
render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
tripControlsHeaderElements.forEach((h2, ind) => {
  render(h2, menuAndFilters[ind], `afterend`);
});
