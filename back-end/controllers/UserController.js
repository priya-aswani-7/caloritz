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

  getById: (id) => {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then((data) => resolve(data))
        .catch((error) =>
          reject(
            error.message.includes("Cast to ObjectId failed")
              ? new Error(`User with ID ${id} does not exist.`)
              : error
          )
        );
    });
  },
};
