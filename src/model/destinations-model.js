import { AbstractObservable } from '../utils/abstract-observable.js';

/**
 * Модель пунктов назначений
 */
class DestinationsModel extends AbstractObservable {
  #destinations = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
    this.#init();
  }

  get destinations() {
    return this.#destinations;
  }

  #init = async () => {
    try {
      // this.#destinations = [];
      this.#destinations = await this.#apiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  };
}

export { DestinationsModel };
