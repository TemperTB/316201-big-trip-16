import { PointEditView } from '../view/point-edit-view.js';
import { getDate } from '../utils/date.js';
import { removeComponent, renderElement, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

/**
 * Объект для добавления задачи
 */
const NEW_POINT = {
  dateBegin: getDate(),
  dateEnd: getDate(),
  type: undefined,
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  price: undefined,
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
    this.#pointEditComponent.setOnSaveClick(this.#onSaveClick);
    this.#pointEditComponent.setOnFormSubmit();
    this.#pointEditComponent.setOnDeleteClick(this.#onDeleteClick);
    this.#pointEditComponent.setOnCloseEditClick(this.#onCloseEditClick);
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

  /**
   * Переход на состояние сохранения
   */
  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  };

  /**
   * Отмена состояния
   */
  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  /**
   * Действие при клике на кнопку Save
   */
  #onSaveClick = (point) => {
    this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, point);
  };

  /**
   * Действие при клике на кнопку Delete
   */
  #onDeleteClick = () => {
    this.destroy();
  };

  /**
   * Действие при нажатии Esc
   */
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
