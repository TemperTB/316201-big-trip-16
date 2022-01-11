/**
Оставляет уникальные значения
 */
const makeTypesUniq = (items) => [...new Set(items)];

/**
 * Функция расчета значений для графика Money
 */
const calcMoneyValuesForChart = (points) => {

  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeTypesUniq(pointTypes);
  const result = [];
  for (let i = 0; i < uniqTypes.length; i++) {
    result[i] = {};
    result[i].name = uniqTypes[i].toUpperCase();
    result[i].value = 0;
    for (const point of points) {
      if (point.type === uniqTypes[i]) {
        result[i].value += point.price;
      }
    }
  }

  result.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  return (result);
};

/**
 * Функция расчета значений для графика Type
 */
const calcTypeValuesForChart = (points) => {

  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeTypesUniq(pointTypes);
  const result = [];
  for (let i = 0; i < uniqTypes.length; i++) {
    result[i] = {};
    result[i].name = uniqTypes[i].toUpperCase();
    result[i].count = 0;
    for (const point of points) {
      if (point.type === uniqTypes[i]) {
        result[i].count++;
      }
    }
  }

  result.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    return 0;
  });
  return result;
};

/**
 * Функция расчета значений для графика Time
 */
const calcTimeValuesForChart = (points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeTypesUniq(pointTypes);
  const result = [];
  for (let i = 0; i < uniqTypes.length; i++) {
    result[i] = {};
    result[i].name = uniqTypes[i].toUpperCase();
    result[i].value = 0;
    for (const point of points) {
      if (point.type === uniqTypes[i]) {
        result[i].value += (point.dateEnd - point.dateBegin);
      }
    }
  }

  result.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  return result;

};

export { calcMoneyValuesForChart, calcTypeValuesForChart, calcTimeValuesForChart };
