module.exports = {
  getMonthYearTimestamp: (UTCTimestamp) => {
    let date = new Date(UTCTimestamp);
    return new Date(date.getFullYear(), date.getMonth()).getTime();
  },
};
