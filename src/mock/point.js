import dayjs from 'dayjs';

const getRandomItemsFromArray = (arr, amount) => {
  if (amount > 0) {
    const entitiesToChoose = arr.slice();
    const chosenEntities = [];
    for (let index = 0; index < amount; index++) {
      const chosenEntity = getRandomItemsFromArray(entitiesToChoose);
      chosenEntities.push(chosenEntity);
    }
    return chosenEntities;
  } else {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const element = arr[randomIndex];
    arr.splice(randomIndex, 1);
    return element;
  }
};

const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const START_DATE = dayjs().add(getRandomInt(30), `days`);
const DURATION_IN_DAYS = 3;

export const OFFERS = [
  {
    type: `Taxi`,
    name: `Order Uber`,
    price: 20
  },
  {
    type: `Flight`,
    name: `Add luggage`,
    price: 50
  },
  {
    type: `Flight`,
    name: `Switch to comfort`,
    price: 100
  },
  {
    type: `Flight`,
    name: `Add meal`,
    price: 15
  },
  {
    type: `Flight`,
    name: `Choose seats`,
    price: 5
  },
  {
    type: `Flight`,
    name: `Travel by train`,
    price: 40
  },
  {
    type: `Drive`,
    name: `Rent a car`,
    price: 200
  },
  {
    type: `Check-in`,
    name: `Add breakfast`,
    price: 50
  },
  {
    type: `Sightseeing`,
    name: `Book tickets`,
    price: 40
  },
  {
    type: `Sightseeing`,
    name: `Lunch in city`,
    price: 30
  }
];

export const TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

const generateType = () => getRandomItemsFromArray(TYPES.slice());

const prices = {
  "Taxi": 20,
  "Bus": 50,
  "Train": 100,
  "Ship": 200,
  "Transport": 30,
  "Drive": 160,
  "Flight": 160,
  'Check-in': 600,
  "Sightseeing": 50,
  "Restaurant": 70,
};

export const DESTINATIONS = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`
];

const generateDestination = () => getRandomItemsFromArray(DESTINATIONS.slice());

const generateOffers = (type) => {
  const offersToChoose = OFFERS.slice().filter((offer) => offer.type === type);
  const amountToChoose = getRandomInt(0, offersToChoose.length);
  const chosenOffers = amountToChoose ? getRandomItemsFromArray(offersToChoose, amountToChoose) : [];

  return chosenOffers;
};

const generateDescription = () => {
  const TEXT_TEMPLATE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const sentencesToChoose = TEXT_TEMPLATE.split(`. `);
  const sentencesAmountToChoose = getRandomInt(1, 5);
  const chosenSentences = getRandomItemsFromArray(sentencesToChoose, sentencesAmountToChoose);
  const text = chosenSentences.join(`. `);

  const PHOTO_SOURCE = `http://picsum.photos/248/152?r=`;

  const photoAmountToChoose = getRandomInt(1, 5);
  const photos = new Array(photoAmountToChoose).fill(photoAmountToChoose).map(() => `${PHOTO_SOURCE}${Math.floor(Math.random() * 1000)}`);

  return {
    text,
    photos
  };
};

const generateTime = (tripStartDate, durationOfTripInDays) => {
  const start = tripStartDate.add(getRandomInt(durationOfTripInDays * 24), `hour`).minute(0);
  const durationInMinutes = getRandomInt(1, durationOfTripInDays * 24 * 6) * 10;
  const end = start.add(durationInMinutes, `minute`);
  return {
    start,
    end
  };
};

export const generatePoint = () => {
  const type = generateType();
  const price = prices[type];
  const destination = generateDestination();
  const offers = generateOffers(type);
  const description = generateDescription();
  const times = generateTime(START_DATE, DURATION_IN_DAYS);
  return {
    type,
    price,
    destination,
    offers,
    description,
    times,
    isFavorite: Boolean(getRandomInt(0, 1))
  };
};
