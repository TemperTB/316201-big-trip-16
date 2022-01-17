/**
 * Обастрактный класс для паттерна наблюдатель
 */
class AbstractObservable {
  #observers = new Set();

  /**
   * Добавить наблюдателя
   */
  addObserver(observer) {
    this.#observers.add(observer);
  }

  /**
   * Удалить наблюдателя
   */
  removeObserver(observer) {
    this.#observers.delete(observer);
  }

  /**
   * Оповестить наблюдателя
   */
  _notify(event, payload) {
    this.#observers.forEach((observer) => observer(event, payload));
  }
}

export { AbstractObservable };
