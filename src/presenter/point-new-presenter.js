import { PointEditView } from '../view/point-edit-view.js';
import { nanoid } from 'nanoid';
import { removeComponent, renderElement, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView();
    this.#pointEditComponent.setOnFormSubmit(this.#onFormSubmit);
    this.#pointEditComponent.setOnDeleteClick(this.#onDeleteClick);

    renderElement(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    removeComponent(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
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
}

export { PointNewPresenter };
