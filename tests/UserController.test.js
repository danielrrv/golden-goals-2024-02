const UserController = require("../controllers/UserController");
const User = require("../models/User");
const httpMocks = require("node-mocks-http");

jest.mock("../models/User");
jest.mock("../utils/redisClient");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
const mockRequest = (data) => httpMocks.createRequest(data);
const mockResponse = () => httpMocks.createResponse();

describe("UserController", () => {
  describe("getUserProfile", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should get user profile successfully", async () => {
      const req = mockRequest({
        method: "GET",
        params: {
          userId: "12345"
        }
      });
      const res = mockResponse();

      req.user = { _id: "12345" };
      User.findById.mockResolvedValue({
        _id: "12345",
        username: "testuser",
        email: "test@example.com"
      });

      await UserController.getUserProfile(req, res);

      expect(User.findById).toHaveBeenCalledWith("12345", "-password");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        _id: "12345",
        username: "testuser",
        email: "test@example.com"
      });
    });

    it("should not allow access to another user profile", async () => {
      const req = mockRequest({
        method: "GET",
        params: {
          userId: "67890"
        }
      });
      const res = mockResponse();

      req.user = { _id: "12345" };

      await UserController.getUserProfile(req, res);

      expect(res.statusCode).toBe(403);
      expect(res._getJSONData()).toEqual({ message: "Access denied." });
    });
  });

  describe("updateUserProfile", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update user profile successfully", async () => {
      const req = mockRequest({
        method: "PUT",
        params: {
          userId: "12345"
        },
        body: {
          username: "updatedUser"
        }
      });
      const res = mockResponse();

      req.user = { _id: "12345" };
      User.findByIdAndUpdate.mockResolvedValue({
        _id: "12345",
        username: "updatedUser",
        email: "test@example.com"
      });

      await UserController.updateUserProfile(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "12345",
        { username: "updatedUser" },
        { new: true, runValidators: true, lean: true, select: "-password" }
      );
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        _id: "12345",
        username: "updatedUser",
        email: "test@example.com"
      });
    });

    it("should not allow updating another user profile", async () => {
      const req = mockRequest({
        method: "PUT",
        params: {
          userId: "67890"
        }
      });
      const res = mockResponse();

      req.user = { _id: "12345" };

      await UserController.updateUserProfile(req, res);

      expect(res.statusCode).toBe(403);
      expect(res._getJSONData()).toEqual({ message: "Access denied." });
    });
  });

  describe("deleteUserAccount", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should delete user account successfully", async () => {
      const req = mockRequest({
        method: "DELETE",
        params: {
          userId: "12345"
        }
      });
      const res = mockResponse();

      req.user = { _id: "12345" };
      User.findByIdAndDelete.mockResolvedValue({
        _id: "12345",
        username: "testuser",
        email: "test@example.com"
      });

      await UserController.deleteUserAccount(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("12345");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: "User account deleted successfully." });
    });

    it("should not allow deleting another user account", async () => {
      const req = mockRequest({
        method: "DELETE",
        params: {
          userId: "67890"
        }
      });
      const res = mockResponse();

      req.user = { _id: "12345" };

      await UserController.deleteUserAccount(req, res);

      expect(res.statusCode).toBe(403);
      expect(res._getJSONData()).toEqual({ message: "Access denied." });
    });
  });
});
