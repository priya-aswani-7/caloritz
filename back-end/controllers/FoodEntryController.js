const { FoodEntry } = require("../models");

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
            delete datum.user._id;
            delete datum.user.name;
            return datum;
          });

          resolve(data);
        })
        .catch((error) => reject(error));
    });
  },
};
