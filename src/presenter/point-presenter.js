import { PointView } from '../view/point-view.js';
import { PointEditView } from '../view/point-edit-view.js';
import { renderElement, RenderPosition, replaceElements } from '../utils/render.js';

class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);

    this.#pointComponent.setOnEditClick(this.#handleEditClick);
    this.#pointEditComponent.setOnFormSubmit(this.#handleFormSubmit);

    renderElement(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  };

  #replaceCardToForm = () => {
    replaceElements(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replaceElements(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}


export { PointPresenter };
