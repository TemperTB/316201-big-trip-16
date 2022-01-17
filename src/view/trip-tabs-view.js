import { AbstractView } from './abstract-view.js';
import { MenuItem } from '../const.js';

/**
 * Разметка для меню
 */
const createTripTabsTemplate = () =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
  </nav>`;

/**
 * Меню
 */
class TripTabsView extends AbstractView {
  get template() {
    return createTripTabsTemplate();
  }

  /**
   * Обработчик клика по кнопке меню
   */
  setOnMenuClick = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#onMenuClick);
  };

  /**
   * Переключение активного меню (визуализация)
   */
  setMenuItem = (menuItem) => {
    const items = this.element.querySelectorAll('.trip-tabs__btn');

    for (const item of items) {
      if (item.textContent === menuItem) {
        item.classList.add('trip-tabs__btn--active');
      } else {
        item.classList.remove('trip-tabs__btn--active');
      }
    }
  };

  /**
   * Переключение активного меню (визуализация)
   */
  isActive = (menuItem) => {
    const item = this.element.querySelector('.trip-tabs__btn--active');
    if (item.textContent === menuItem) {
      return true;
    }
    return false;
  };

  /**
   * Действие при клике на меню
   */
  #onMenuClick = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  };

}

export { TripTabsView };
