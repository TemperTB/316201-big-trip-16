import { PointView } from '../view/point-view.js';
import { PointEditView } from '../view/point-edit-view.js';
import { renderElement, RenderPosition, replaceElements, removeComponent } from '../utils/render.js';

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

    this.#pointComponent.setOnEditClick(this.#handleEditClick);
    this.#pointEditComponent.setOnFormSubmit(this.#handleFormSubmit);
    this.#pointComponent.setOnFavoriteClick(this.#handleFavoriteClick);

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
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  /**
   * Закрытие формы редактирования
   */
  #replaceFormToCard = () => {
    replaceElements(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  /**
   * Действие при нажатии Esc
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  /**
   * Действие при клике на стрелку для открытия формы редактирования
   */
  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  /**
   *
   * Действия при сохранении формы редактирования
   */
  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };

  /**
   * Действия при клике на звездочку (избранное)
   */
  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}

export { PointPresenter };
