export const getDuration = (start, end) => {
  const daysDuration = end.diff(start, `day`);
  const hoursDuration = end.subtract(daysDuration, `day`).diff(start, `hour`);
  const minutesDuration = end.subtract(daysDuration, `day`).subtract(hoursDuration, `hour`).diff(start, `minute`);
  let duration = `${minutesDuration}M`;
  if (!minutesDuration) {
    duration = `0`.concat(duration);
  }
  if (hoursDuration) {
    duration = `${hoursDuration}H `.concat(duration);
    if (hoursDuration < 10) {
      duration = `0`.concat(duration);
    }
  }
  if (daysDuration) {
    if (!hoursDuration) {
      duration = `00H `.concat(duration);
    }
    duration = `${daysDuration}D `.concat(duration);
    if (daysDuration < 10) {
      duration = `0`.concat(duration);
    }
  }
  return duration;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
