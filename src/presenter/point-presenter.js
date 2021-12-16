import { PointView } from '../view/point-view.js';
import { PointEditView } from '../view/point-edit-view.js';
import { renderElement, RenderPosition, replaceElements, removeComponent } from '../utils/render.js';

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

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);

    this.#pointComponent.setOnEditClick(this.#handleEditClick);
    this.#pointEditComponent.setOnFormSubmit(this.#handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      renderElement(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#pointListContainer.element.contains(prevPointComponent.element)) {
      replaceElements(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.element.contains(prevPointEditComponent.element)) {
      replaceElements(this.#pointEditComponent, prevPointEditComponent);
    }

    removeComponent(prevPointComponent);
    removeComponent(prevTaskEditComponent);
  };

  destroy = () => {
    removeComponent(this.#pointComponent);
    removeComponent(this.#pointEditComponent);
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
