const { FoodEntry } = require("../models");
const { getMonthYearTimestamp } = require("../utils/helpers");

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      FoodEntry.find(params)
        .populate("user", { _id: 1, name: 1 })
        .sort("consumedAt")
        .lean()
        .then((data) => {
          data = data.map((datum) => {
            datum.userId = datum.user._id;
            datum.userName = datum.user.name;
            delete datum.user;
            return datum;
          });

          resolve(data);
        })
        .catch((error) => reject(error));
    });
  },

  getByUserId: (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
      FoodEntry.find({ user: id })
        .sort("consumedAt")
        .lean()
        .then((data) => {
          console.log(data);
          let result = [];

          let currentTimestamp =
            data.length > 0 ? getMonthYearTimestamp(data[0].consumedAt) : null;
          let currentMonthYear = {
            monthYear: currentTimestamp,
            foodEntries: data.length > 0 ? [data[0]] : [],
          };
          for (let i = 1; i < data.length; i++) {
            if (
              getMonthYearTimestamp(data[i].consumedAt) === currentTimestamp
            ) {
              currentMonthYear.foodEntries.push(data[i]);
            } else {
              result.push(currentMonthYear);
              currentTimestamp = getMonthYearTimestamp(data[i].consumedAt);
              currentMonthYear = {
                monthYear: currentTimestamp,
                foodEntries: [data[i]],
              };
            }
          }
          if (
            (result.length > 0 &&
              result[result.length - 1].monthYear !== currentTimestamp) ||
            (result.length === 0 && currentMonthYear.foodEntries.length !== 0)
          ) {
            result.push(currentMonthYear);
          }

          resolve(result);
        })
        .catch((error) => reject(error));
    });
  },

  post: (params) => {
    return new Promise((resolve, reject) => {
      FoodEntry.create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },

  put: (id, params) => {
    return new Promise((resolve, reject) => {
      FoodEntry.findByIdAndUpdate(id, params, { new: true })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      FoodEntry.findByIdAndDelete(id)
        .then(() => resolve(id))
        .catch((error) => reject(error));
    });
  },
};
