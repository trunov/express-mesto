const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => res.status(404).send({ message: "Запрашиваемый ресурс не найден" }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "Нет пользователя с таким id" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ err });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};
