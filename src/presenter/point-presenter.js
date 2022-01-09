import { PointView } from '../view/point-view.js';
import { PointEditView } from '../view/point-edit-view.js';
import { renderElement, RenderPosition, replaceElements, removeComponent } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';
import { isDifferentValue } from '../utils/common.js';

/**
 * Отображение карточки: Обычный режим и редактирование
 */
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  /**
   * Инициализация
   */
  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);

    this.#pointComponent.setOnEditClick(this.#onEditClick);
    this.#pointEditComponent.setOnFormSubmit(this.#onFormSubmit);
    this.#pointComponent.setOnFavoriteClick(this.#onFavoriteClick);
    this.#pointEditComponent.setOnDeleteClick(this.#onDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      renderElement(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replaceElements(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replaceElements(this.#pointEditComponent, prevPointEditComponent);
    }

    if (this.#pointListContainer.element.contains(prevPointComponent.element)) {
      replaceElements(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.element.contains(prevPointEditComponent.element)) {
      replaceElements(this.#pointEditComponent, prevPointEditComponent);
    }

    removeComponent(prevPointComponent);
    removeComponent(prevPointEditComponent);
  };

  /**
   * Удаление компонента
   */
  destroy = () => {
    removeComponent(this.#pointComponent);
    removeComponent(this.#pointEditComponent);
  };

  /**
   * Принудительное закрытие формы для редактирования
   */
  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  /**
   * Открытие формы редактирования
   */
  #replaceCardToForm = () => {
    replaceElements(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    document.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseEditClick);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  /**
   * Закрытие формы редактирования
   */
  #replaceFormToCard = () => {
    replaceElements(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    document.querySelector('.event__rollup-btn').removeEventListener('click', this.#onCloseEditClick);
    this.#mode = Mode.DEFAULT;
  };

  /**
   * Действие при нажатии Esc
   */
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  /**
   * Действие при клике на стрелку для открытия формы редактирования
   */
  #onEditClick = () => {
    this.#replaceCardToForm();
  };

  /**
  * Действие при клике на стрелку для закрытия формы редактирования
  */
  #onCloseEditClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  /**
   *
   * Действия при сохранении формы редактирования
   */
  #onFormSubmit = (point) => {
    const isMinorUpdate =
      isDifferentValue(this.#point.dateBegin, point.dateBegin) ||
      isDifferentValue(this.#point.price, point.price);
    this.#changeData(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, point);
    this.#replaceFormToCard();
  };

  /**
   * Действия при клике на звездочку (избранное)
   */
  #onFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_POINT, UpdateType.PATCH, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  /**
   * Действие при клике на кнопку удалить
   */
  #onDeleteClick = (point) => {
    this.#changeData(UserAction.DELETE_POINT, UpdateType.MAJOR
      , point);
  };
}

export { PointPresenter };
