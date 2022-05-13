const now = new Date().getTime();
const yesterday = now - 24 * 3600 * 1000;
const lastWeek = yesterday - 24 * 6 * 3600 * 1000;
const lastToLastWeek = lastWeek - 24 * 6 * 3600 * 1000;

export const statisticsData = [
  {
    foodEntryCount: 350,
    timePhrase: "in the last fortnight",
    startDate: lastToLastWeek,
    endDate: lastWeek - 24 * 3600 * 1000,
  },
  {
    foodEntryCount: 200,
    timePhrase: "in the last 7 days",
    startDate: lastWeek,
    endDate: yesterday,
  },
];
