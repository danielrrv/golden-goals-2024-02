const { mockDeep } = require("jest-mock-extended");

const redisClient = mockDeep();
redisClient.setex = jest.fn();
redisClient.get = jest.fn();

module.exports = redisClient;
