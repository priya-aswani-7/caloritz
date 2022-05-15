const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

  post: async (params) => {
    try {
      const password = await bcrypt.hash(params.password, 10);
      const oldUser = await User.findOne({ email: params.email });
      if (oldUser) {
        throw new Error(`User with email ${params.email} already exists.`);
      }

      const user = await User.create({ ...params, password });
      const token = await jwt.sign(
        { userId: user._id, email: user.email, type: user.type },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const data = { ...user._doc, token };
      return data;
    } catch (error) {
      throw error;
    }
  },
};
