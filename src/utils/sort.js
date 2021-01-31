export const sortPointsByDay = (pointA, pointB) => {
  return pointA.times.start.diff(pointB.times.start);
};

export const sortPointsByTime = (pointA, pointB) => {
  return pointB.times.end.diff(pointB.times.start) - pointA.times.end.diff(pointA.times.start);
};

export const sortPointsByPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};
