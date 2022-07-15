const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS_OF_YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const daysBetween = (date1: Date, date2: Date) => {
  const ONE_DAY_ON_SECONDS = 1000 * 60 * 60 * 24;
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  const differenceMs = date2Ms - date1Ms;
  return Math.round(differenceMs / ONE_DAY_ON_SECONDS);
};

const getHoursFromDate = (date: Date) => {
  var hours = date.getHours();
  var minutes: string | number = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};

const dateFromNow = (date: Date) => {
  const currentDate = new Date();

  if (
    date.getUTCDate() === currentDate.getUTCDate() &&
    date.getUTCMonth() === currentDate.getUTCMonth() &&
    date.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // @ts-ignore
    const hours = Math.floor(Math.abs(date - currentDate) / 36e5);

    if (hours === 0) {
      const minutes = Math.round(
        // @ts-ignore
        ((Math.abs(date - currentDate) % 86400000) % 3600000) / 60000
      );
      return minutes <= 1 ? "A while ago" : `${minutes} min ago.`;
    } else {
      return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""} ago`;
    }
  } else {
    if (
      date.getUTCFullYear() < currentDate.getUTCFullYear() ||
      daysBetween(date, currentDate) > 6
    ) {
      return `${date.getDate()}/${
        MONTHS_OF_YEAR[date.getMonth()]
      }/${date.getFullYear()}`;
    } else {
      return `${DAYS_OF_WEEK[date.getDay()]} at ${getHoursFromDate(date)}`;
    }
  }
};

export default dateFromNow;
