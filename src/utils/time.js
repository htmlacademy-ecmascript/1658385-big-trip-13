import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const humanizeDuration = (milliseconds) => {
  const dayjsDuration = dayjs.duration(milliseconds);
  const daysDuration = dayjsDuration.days();
  const hoursDuration = dayjsDuration.hours();
  const minutesDuration = dayjsDuration.minutes();
  let humanDuration = `${minutesDuration}M`;
  if (!minutesDuration) {
    humanDuration = `0`.concat(humanDuration);
  }
  if (hoursDuration) {
    humanDuration = `${hoursDuration}H `.concat(humanDuration);
    if (hoursDuration < 10) {
      humanDuration = `0`.concat(humanDuration);
    }
  }
  if (daysDuration) {
    if (!hoursDuration) {
      humanDuration = `00H `.concat(humanDuration);
    }
    humanDuration = `${daysDuration}D `.concat(humanDuration);
    if (daysDuration < 10) {
      humanDuration = `0`.concat(humanDuration);
    }
  }
  return humanDuration;
};

export const compareTimes = (dateA, dateB) => {
  return dayjs(dateA).isSame(dateB, `m`);
};
