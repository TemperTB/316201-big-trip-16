import AbstractView from './abstract-view.js';

/**
 * Разметка для информации о загрузке данных с сервера
 */
const createNoTaskTemplate = () => '<p class="trip-events__msg">Loading...</p>';

/**
 * ИНформация о загрузке данных с сервера
 */
class LoadingView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}

export { LoadingView };
