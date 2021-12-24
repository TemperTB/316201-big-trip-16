import AbstractView from './abstract-view.js';

class SmartView extends AbstractView {

  _data = {};

  /**
   * Обновляет данные и затем при необходимости рендерит компонент
   * @param update - обновленные данные
   * @param {boolean} justDataUpdating - надо ли перерисовывать компонент
   */
  updateData = (update, justDataUpdating) => {

    this._data = { ...this._data, ...update };

    if (justDataUpdating) {
      return;
    }
    this.updateElement();
  };

  /**
   * Заменяет один DOM-элемент на другой.
   * Так реализуется рендеринг компонента после обновления данных
   */
  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  };

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  };
}

export { SmartView };
