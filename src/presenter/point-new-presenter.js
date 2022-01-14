import { PointEditView } from '../view/point-edit-view.js';
import { nanoid } from 'nanoid';
import { removeComponent, renderElement, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

/**
 * Объект для добавления задачи
 */
const NEW_POINT = {
  dateBegin: undefined,
  dateEnd: undefined,
  type: undefined,
  destination: {
    description: '',
    name: '"Input destination city"',
    pictures: [],
  },
  price: 0,
  offers: [],
  isFavorite: false,
};
class PointNewPresenter {
  #offers = null;
  #destinations = null;
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (offers, destinations) => {
    this.#offers = offers;
    this.#destinations = destinations;
    NEW_POINT.type = offers[0].type;
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView(NEW_POINT, this.#offers, this.#destinations);
    this.#pointEditComponent.setOnFormSubmit(this.#onFormSubmit);
    this.#pointEditComponent.setOnDeleteClick(this.#onDeleteClick);
    this.#pointEditComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onCloseEditClick);

    renderElement(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);

  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#pointEditComponent.element
      .querySelector('.event__rollup-btn')
      .removeEventListener('click', this.#onCloseEditClick);

    removeComponent(this.#pointEditComponent);
    this.#pointEditComponent = null;
  };

  #onFormSubmit = (point) => {
    this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, { id: nanoid(), ...point });
    this.destroy();
  };

  #onDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  /**
   * Действие при клике на стрелку для закрытия формы создания
   */
  #onCloseEditClick = () => {
    this.destroy();
  };
}

export { PointNewPresenter };
