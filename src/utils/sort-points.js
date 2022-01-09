/**
 * Сортировка по времени начала события
 */
const sortDays = (pointA, pointB) => {
  if (pointA.dateBegin >= pointB.dateBegin) {
    return -1;
  }
  return 1;
};

/**
 * Сортировка по стоимости (от большего к меньшему)
 */
const sortPrice = (pointA, pointB) => {
  if (pointA.price >= pointB.price) {
    return -1;
  }
  return 1;
};

/**
 * Сортировка по длительности (от большего к меньшему)
 */
const sortTime = (pointA, pointB) => {
  const durationPointA = pointA.dateEnd.diff(pointA.dateBegin);
  const durationPointB = pointB.dateEnd.diff(pointB.dateBegin);
  if (durationPointA >= durationPointB) {
    return -1;
  }
  return 1;
};

export { sortDays, sortPrice, sortTime };
