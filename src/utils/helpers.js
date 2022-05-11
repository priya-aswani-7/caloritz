export const getMonthYearString = (UTCTimestamp) => {
  let date = new Date(UTCTimestamp);
  let month = date.getMonth();
  let year = date.getFullYear();
  const monthYearString =
    (month === 0
      ? "January"
      : month === 1
      ? "February"
      : month === 2
      ? "March"
      : month === 3
      ? "April"
      : month === 4
      ? "May"
      : month === 5
      ? "June"
      : month === 6
      ? "July"
      : month === 7
      ? "August"
      : month === 8
      ? "September"
      : month === 9
      ? "October"
      : month === 10
      ? "November"
      : "December") +
    ", " +
    year;

  return monthYearString;
};

export const getDateTimeString = (UTCTimestamp) => {
  let date = new Date(UTCTimestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let meridian = hours > 12 || (hours === 12 && minutes > 0) ? "pm" : "am";
  let dateString = date.toString().split(" ");

  let dateTimeString =
    (meridian === "pm"
      ? hours < 22
        ? "0" + hours - 12
        : hours - 12
      : hours < 10
      ? "0" + hours
      : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    meridian +
    ", " +
    dateString[2] +
    " " +
    dateString[1] +
    " " +
    dateString[3];

  return dateTimeString;
};

export const getInsertPosition = (data, propertyName, value) => {
  let low = 0;
  let high = data.length - 1;
  let mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (data[mid][propertyName] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
};
