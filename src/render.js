/**
 * Позиции вставки шаблона
 */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Добавляет шаблон в определенное место в контейнере
 * @param {Object} container - DOM-элемент
 * @param {String} template - шаблон
 * @param {String} place - место вставки
 */
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export { renderTemplate, RenderPosition };
