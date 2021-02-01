export const getUniqueArray = (array) => {
  return [...new Set(array)];
};

export const calcPricesByType = (points, types) => {
  return types.map((type) => {
    return points.reduce(
        (sum, point) => point.type === type ? sum + point.price : sum,
        0);
  });
};

export const calcTypes = (points, types) => {
  return types.map((type) => {
    return points.reduce(
        (sum, point) => point.type === type ? sum + 1 : sum,
        0);
  });
};

export const calcDurations = (points, types) => {
  return types.map((type) => {
    return points.reduce(
        (sum, point) => point.type === type ? sum + point.times.end.diff(point.times.start) : sum,
        0);
  });
};
