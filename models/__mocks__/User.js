const { mockDeep } = require("jest-mock-extended");

const User = mockDeep();
User.findOne = jest.fn();
User.prototype.save = jest.fn();
User.findById = jest.fn();
User.findByIdAndUpdate = jest.fn();
User.findByIdAndDelete = jest.fn();

module.exports = User;
