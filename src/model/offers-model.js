import { AbstractObservable } from '../utils/abstract-observable.js';

/**
 * Модель доп. услуг
 */
class OffersModel extends AbstractObservable {
  #offers = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
    this.#init();
  }

  get offers() {
    return this.#offers;
  }

  #init = async () => {
    try {
      this.#offers = [];
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  };

}

export { OffersModel };
