const { FoodEntry } = require("../models");

module.exports = {
  get: async () => {
    let date = new Date();
    let now = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    let yesterday = now - 24 * 3600 * 1000;
    let lastWeek = yesterday - 24 * 6 * 3600 * 1000;
    let lastToLastWeek = lastWeek - 24 * 6 * 3600 * 1000;

    try {
      let count1 = await FoodEntry.find({
        createdAt: {
          $gte: new Date(lastToLastWeek),
          $lte: new Date(lastWeek - 24 * 3600 * 1000),
        },
      }).count();

      let count2 = await FoodEntry.find({
        createdAt: { $gte: new Date(lastWeek), $lte: new Date(yesterday) },
      }).count();

      return {
        now: now,
        foodEntryCounts: [
          {
            foodEntryCount: count1,
            timePhrase: "in the last fortnight",
            startTime: lastToLastWeek,
            endDate: lastWeek - 24 * 3600 * 1000,
          },
          {
            foodEntryCount: count2,
            timePhrase: "in the last 7 days",
            startTime: lastWeek,
            endTime: yesterday,
          },
        ],
      };
    } catch (error) {
      return error;
    }
  },
};
