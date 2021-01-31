export const updatePoint = (points, updatedPoint) => {
  return points.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
};

export const isEqualOffers = (offersA, offersB) => {
  return JSON.stringify(offersA.map((offer) => offer.name).sort()) === JSON.stringify(offersB.map((offer) => offer.name).sort());
};
