// src/modules/auth/auth.service.js
const User = require("./auth.model");
exports.findByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

exports.findById = async (id) => {
  return User.findById(id);
};

exports.createUser = async (payload) => {
  return User.create(payload);
};