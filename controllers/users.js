const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: "Нет пользователей" });
      } else {
        res.status(200).send({ data: users });
      }
    })
    .catch(() => {
      res.status(500).send({ message: "Ошибка на стороне сервера" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.status(200).send({ message: "данные пользователя обновлены", name: user.name, about: user.about });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.status(200).send({ message: "данные пользователя обновлены", avatar: user.avatar });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
