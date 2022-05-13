const { User } = require("../models");

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      User.find(params)
        .sort("name")
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
};
