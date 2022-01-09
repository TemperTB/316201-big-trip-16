/**
 * Дополнительные опции
 */
const OFFERS = [
  {
    type: 'taxi',
    offers: [
      //   {
      //     id: event-offer-taxi-1,
      //     title: 'Taxi-1',
      //     price: 50,
      //   },
      //   {
      //     id: event-offer-taxi-2,
      //     title: 'Taxi-2',
      //     price: 150,
      //   },
      //   {
      //     id: event-offer-taxi-3,
      //     title: 'Taxi-3',
      //     price: 100,
      //   },
      //   {
      //     id: event-offer-taxi-4,
      //     title: 'Taxi-4',
      //     price: 500,
      //   },
      //   {
      //     id: event-offer-taxi-5,
      //     title: 'Taxi-5',
      //     price: 10,
      //   },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'event-offer-bus-1',
        title: 'Bus-1',
        price: 50,
      },
      {
        id: 'event-offer-bus-2',
        title: 'Bus-2',
        price: 150,
      },
      {
        id: 'event-offer-bus-3',
        title: 'Bus-3',
        price: 100,
      },
      {
        id: 'event-offer-bus-4',
        title: 'Bus-4',
        price: 500,
      },
      {
        id: 'event-offer-bus-5',
        title: 'Bus-5',
        price: 10,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 'event-offer-train-1',
        title: 'Train-1',
        price: 50,
      },
      {
        id: 'event-offer-train-2',
        title: 'Train-2',
        price: 150,
      },
      {
        id: 'event-offer-train-3',
        title: 'Train-3',
        price: 100,
      },
      {
        id: 'event-offer-train-4',
        title: 'Train-4',
        price: 500,
      },
      {
        id: 'event-offer-train-5',
        title: 'Train-5',
        price: 10,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'event-offer-ship-1',
        title: 'Ship-1',
        price: 50,
      },
      {
        id: 'event-offer-ship-2',
        title: 'Ship-2',
        price: 150,
      },
      {
        id: 'event-offer-ship-3',
        title: 'Ship-3',
        price: 100,
      },
      {
        id: 'event-offer-ship-4',
        title: 'Ship-4',
        price: 500,
      },
      {
        id: 'event-offer-ship-5',
        title: 'Ship-5',
        price: 10,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'event-offer-drive-1',
        title: 'Drive-1',
        price: 50,
      },
      {
        id: 'event-offer-drive-2',
        title: 'Drive-2',
        price: 150,
      },
      {
        id: 'event-offer-drive-3',
        title: 'Drive-3',
        price: 100,
      },
      {
        id: 'event-offer-drive-4',
        title: 'Drive-4',
        price: 500,
      },
      {
        id: 'event-offer-drive-5',
        title: 'Drive-5',
        price: 10,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'event-offer-flight-1',
        title: 'Flight-1',
        price: 50,
      },
      {
        id: 'event-offer-flight-2',
        title: 'Flight-2',
        price: 150,
      },
      {
        id: 'event-offer-flight-3',
        title: 'Flight-3',
        price: 100,
      },
      {
        id: 'event-offer-flight-4',
        title: 'Flight-4',
        price: 500,
      },
      {
        id: 'event-offer-flight-5',
        title: 'Flight-5',
        price: 10,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'event-offer-check-in-1',
        title: 'Check-in-1',
        price: 50,
      },
      {
        id: 'event-offer-check-in-2',
        title: 'Check-in-2',
        price: 150,
      },
      {
        id: 'event-offer-check-in-3',
        title: 'Check-in-3',
        price: 100,
      },
      {
        id: 'event-offer-check-in-4',
        title: 'Check-in-4',
        price: 500,
      },
      {
        id: 'event-offer-check-in-5',
        title: 'Check-in-5',
        price: 10,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'event-offer-sightseeing-1',
        title: 'Sightseeing-1',
        price: 50,
      },
      {
        id: 'event-offer-sightseeing-2',
        title: 'Sightseeing-2',
        price: 150,
      },
      {
        id: 'event-offer-sightseeing-3',
        title: 'Sightseeing-3',
        price: 100,
      },
      {
        id: 'event-offer-sightseeing-4',
        title: 'Sightseeing-4',
        price: 500,
      },
      {
        id: 'event-offer-sightseeing-5',
        title: 'Sightseeing-5',
        price: 10,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'event-offer-restaurant-1',
        title: 'Restaurant-1',
        price: 50,
      },
      {
        id: 'event-offer-restaurant-2',
        title: 'Restaurant-2',
        price: 150,
      },
      {
        id: 'event-offer-restaurant-3',
        title: 'Restaurant-3',
        price: 100,
      },
      {
        id: 'event-offer-restaurant-4',
        title: 'Restaurant-4',
        price: 500,
      },
      {
        id: 'event-offer-restaurant-5',
        title: 'Restaurant-5',
        price: 10,
      },
    ],
  },
];

/**
 * Генерирует дополнительные опции
 */
const generateOffers = (type, number) => {
  if (number === 0) {
    return [];
  }
  for (const offer of OFFERS) {
    if (offer.type === type) {
      if (offer.offers.length < number) {
        return offer.offers;
      }
      return offer.offers.slice(0, number);
    }
  }
};

export { generateOffers, OFFERS };
