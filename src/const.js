/**
 * Типы точки маршрута
 */
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

/**
 * Типы сортировки
 */
const SortType = {
  DEFAULT: 'default',
  DAYS: 'days',
  TIME: 'time',
  PRICE: 'price',
};

/**
 * Список фильтров
 */
export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

/**
 * Действия пользователя
 */
const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

/**
 * Тип обновления
 */
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

/**
 * Пункты меню
 */
const MenuItem = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export { EVENT_TYPES, SortType, UserAction, UpdateType, MenuItem };
