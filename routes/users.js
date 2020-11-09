const usersRouter = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);

module.exports = usersRouter;
