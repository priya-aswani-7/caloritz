const { User } = require("../models");

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      User.find(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
};
