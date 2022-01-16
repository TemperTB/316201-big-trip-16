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

/**
 * Состояние точки маршрута
 */
const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  /**
   * Инициализация
   */
  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point, this.#offers, this.#destinations);

    this.#pointComponent.setOnEditClick(this.#onEditClick);
    this.#pointComponent.setOnFavoriteClick(this.#onFavoriteClick);
    this.#pointEditComponent.setOnSaveClick(this.#onSaveClick);
    this.#pointEditComponent.setOnFormSubmit();
    this.#pointEditComponent.setOnDeleteClick(this.#onDeleteClick);
    this.#pointEditComponent.setOnCloseEditClick(this.#onCloseEditClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      renderElement(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replaceElements(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replaceElements(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
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
   * Установка статуса точки маршрута
   */
  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#pointComponent.shake(resetFormState);
        this.#pointEditComponent.shake(resetFormState);
        break;
    }
  };

  /**
   * Открытие формы редактирования
   */
  #replaceCardToForm = () => {
    replaceElements(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  /**
   * Закрытие формы редактирования
   */
  #replaceFormToCard = () => {
    replaceElements(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
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
  #onSaveClick = (point) => {
    let isMinorUpdate = false;
    if (
      isDifferentValue(this.#point.dateBegin, point.dateBegin) ||
      isDifferentValue(this.#point.price, point.price) ||
      this.#point.offers !== point.offers
    ) {
      isMinorUpdate = true;
    }
    this.#changeData(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, point);
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
    this.#changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, point);
  };
}

export { PointPresenter, State };
