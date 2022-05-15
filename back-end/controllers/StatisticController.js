const { FoodEntry } = require("../models");
const User = require("../models/User");

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
      let fortnightCount = await FoodEntry.find({
        consumedAt: {
          $gte: lastToLastWeek,
          $lte: lastWeek - 24 * 3600 * 1000,
        },
      }).count();

      let lastWeekCount = await FoodEntry.find({
        consumedAt: { $gte: lastWeek, $lte: yesterday },
      }).count();

      let calorieData = await FoodEntry.aggregate([
        {
          $match: {
            consumedAt: { $gte: lastWeek, $lte: yesterday },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_doc",
          },
        },
        {
          $unwind: "$user_doc",
        },
        {
          $group: {
            _id: "$user_doc",
            averageCalories: { $avg: "$calories" },
          },
        },
        {
          $project: {
            "_id._id": 1,
            "_id.name": 1,
            averageCalories: 1,
          },
        },
        { $sort: { "_id.name": 1 } },
      ]);

      let users = await User.find({ type: "user" }).sort("name");
      let calorieStatisticsData = [];
      let index = 0;

      users?.map((user) => {
        let bool = calorieData[index]?._id?.name === user.name;
        console.log(calorieData[index]?._id?.name, user.name);
        calorieStatisticsData.push({
          userId: user._id,
          userName: user.name,
          averageCalories: bool ? calorieData[index].averageCalories : 0,
        });

        bool && index++;
      });

      let foodEntryStatisticsData = {
        now: now,
        foodEntryCounts: [
          {
            foodEntryCount: fortnightCount,
            timePhrase: "in the week before",
            startDate: lastToLastWeek,
            endDate: lastWeek - 24 * 3600 * 1000,
          },
          {
            foodEntryCount: lastWeekCount,
            timePhrase: "in the last 7 days",
            startDate: lastWeek,
            endDate: yesterday,
          },
        ],
      };

      return {
        calorieStatisticsData,
        foodEntryStatisticsData,
      };
    } catch (error) {
      throw error;
    }
  },
};
