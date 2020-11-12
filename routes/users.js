const usersRouter = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");

usersRouter.get("/users", getUsers);
usersRouter.get("/users/:id", getUser);

module.exports = usersRouter;
