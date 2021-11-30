const offers = [
  {
    title: 'For non-smokers',
    price: 50,
  },
  {
    title: 'Wi-Fi',
    price: 150,
  },
  {
    title: 'Charging',
    price: 100,
  },
  {
    title: 'Very quiet',
    price: 500,
  },
  {
    title: 'Some option',
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
