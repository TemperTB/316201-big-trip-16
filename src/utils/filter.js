import { FilterType } from '../const';
import { isDateEndPast, isDateBeginFuture } from './date.js';

/**
 * Функции фильтрации
 */
const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isDateEndPast(point.dateEnd)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateBeginFuture(point.dateBegin)),
};

export { filter };
