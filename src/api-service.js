const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this.#load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this.#load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  /**
   * Обновление данных на сервере
   */
  updatePoint = async (point) =>
    await ApiService.parseResponse(
      await this.#load({
        url: `points/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      }),
    );

  /**
   * Добавление данных на сервер
   */
  addPoint = async (point) =>
    await ApiService.parseResponse(
      await this.#load({
        url: 'points',
        method: Method.POST,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      }),
    );

  /**
   * Удаление данных с сервера
   */
  deletePoint = async (point) =>
    await this.#load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

  /**
   * Загрузка данных с сервера
   */
  #load = async ({ url, method = Method.GET, body = null, headers = new Headers() }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(`${this.#endPoint}/${url}`, { method, body, headers });
    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  };

  /**
   * Переход с данных фронта на бэкенд
   */
  #adaptToServer = (point) => {
    const adaptedPoint = {
      ...point,
      // eslint-disable-next-line camelcase
      date_from: point.dateBegin !== null ? point.dateBegin.toISOString() : null,
      // eslint-disable-next-line camelcase
      date_to: point.dateEnd !== null ? point.dateEnd.toISOString() : null,
      // eslint-disable-next-line camelcase
      is_favorite: point.isFavorite,
      // eslint-disable-next-line camelcase
      base_price: +point.price,
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint.dateBegin;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;
    return adaptedPoint;
  };

  /**
   * Перевод в JSON
   */
  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  static catchError = (err) => {
    throw err;
  };
}

export { ApiService };
