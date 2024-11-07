const { Router } = require("express");
const allAPIRoutes = new Router();

const usersRoute = require("./users");
const lessonRoute = require("./lesson");

allAPIRoutes.use("/users", usersRoute);
allAPIRoutes.use("/lessons", lessonRoute);

module.exports = allAPIRoutes;
