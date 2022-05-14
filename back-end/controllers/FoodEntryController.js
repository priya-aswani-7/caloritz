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
            delete datum.user;
            return datum;
          });

          resolve(data);
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
