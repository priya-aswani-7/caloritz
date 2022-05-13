const { FoodEntry } = require("../models");

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      FoodEntry.find(params)
        .populate("user", { _id: 1, name: 1 })
        .sort("consumedAt")
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
};
