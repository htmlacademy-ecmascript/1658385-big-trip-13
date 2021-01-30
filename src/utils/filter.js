import {FilterType} from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.times.start.diff() > 0),
  [FilterType.PAST]: (points) => points.filter((point) => point.times.end.diff() < 0)
};
