const offers = [
  {
    title: 'Для некурящих',
    price: 50,
  },
  {
    title: 'Наличие Wi-Fi',
    price: 150,
  },
  {
    title: 'Наличие зарядки',
    price: 100,
  },
  {
    title: 'Очень тихо',
    price: 500,
  },
  {
    title: 'Опция для галочки',
    price: 10,
  },
];

/**
 * Генерирует дополнительные опции
 */
const generateOffers = (number) => {
  if (number === 0) {
    return [];
  }
  return offers.slice(0, number);
};

export { generateOffers };
