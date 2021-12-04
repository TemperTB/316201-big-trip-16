/**
 * Позиции вставки шаблона
 */
export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 *  Рендер компонентов
 * @param {*} container - родитель для вставки
 * @param {*} element - элемент для вставки
 * @param {*} place - куда именно вставлять
 */
export const renderComponent = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(component);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
    case RenderPosition.AFTEREND:
      container.after(component);
      break;
    default:
      container.append(component);
  }
};

/**
 * Создает элемент на основе разметки
 */
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template;
  return newElement.firstChild;
};

