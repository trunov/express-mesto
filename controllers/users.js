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
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "Нет пользователя с таким id" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "в запрос переданы неправильные значения" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
