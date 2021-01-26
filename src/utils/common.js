export const updatePoint = (points, updatedPoint) => {
  return points.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
};
