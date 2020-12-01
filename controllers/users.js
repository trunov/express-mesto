const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find()
    .orFail(() => {
      const error404 = new Error("Пользователь не найдены");
      error404.statusCode = 404;
      throw error404;
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error404 = new Error("Пользователь не найден");
      error404.statusCode = 404;
      throw error404;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .orFail(() => {
      const error404 = new Error("пользователь не найден");
      error404.statusCode = 404;
      throw error404;
    })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.userId, { name, about }, { new: true })
    .orFail(() => {
      const error404 = new Error("пользователь не найден");
      error404.statusCode = 404;
      throw error404;
    })
    .then((user) => res.status(200).send({ message: "данные пользователя обновлены", name: user.name, about: user.about }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.userId, { avatar }, { new: true })
    .orFail(() => {
      const error404 = new Error("пользователь не найден");
      error404.statusCode = 404;
      throw error404;
    })
    .then(() => res.status(200).send({ message: "аватар пользователя обновлен" }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
