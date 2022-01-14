import { AbstractObservable } from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';
import { getDate } from '../utils/date.js';

/**
 * Модель точек путешествия
 */
class PointsModel extends AbstractObservable {
  #points = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    // try {
    //   const response = await this.#apiService.updatePoint(update);
    //   const updatedPoint = this.#adaptToClient(response);
    //   this.#points = [...this.#points.slice(0, index), updatedPoint, ...this.#points.slice(index + 1)];
    //   this._notify(updateType, updatedPoint);
    // } catch (err) {
    //   throw new Error('Can\'t update task');
    // }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };

  /**
   * Добавление точки
   */
  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  };

  /**
   * Удаление точки
   */
  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType);
  };

  /**
   * Перевод данных с бэкенда на фронт
   */
  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      dateBegin: point['date_from'] !== null ? getDate(point['date_from']) : point['date_from'], // На клиенте дата хранится как экземпляр Date
      dateEnd: point['date_to'] !== null ? getDate(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      price: point['base_price'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];

    return adaptedPoint;
  };
}

export { PointsModel };
