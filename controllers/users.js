const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find()
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      switch (err.name) {
        case "DocumentNotFoundError":
          res.status(404).send({ message: "пользователи не найдены" });
          break;
        case "CastError":
          res.status(422).send({ message: "в запрос переданы неправильные значения" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "нет пользователя с таким id" });
      }
      res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
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
          res
            .status(404)
            .send({ message: "в запрос переданы неправильные значения" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.userId, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((user) => res.status(200).send({ message: "данные пользователя обновлены", name: user.name, about: user.about }))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res
            .status(404)
            .send({ message: "в запрос переданы неправильные значения" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.userId, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then(() => res.status(200).send({ message: "аватар пользователя обновлен" }))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res
            .status(404)
            .send({ message: "в запрос переданы неправильные значения" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
