const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find()
    .orFail(() => {
      const error404 = new Error("Карточки не найдены");
      error404.statusCode = 404;
      throw error404;
    })
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет карточки с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const error404 = new Error("Карточки не найдены");
      error404.statusCode = 404;
      throw error404;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет карточки с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      const error404 = new Error("Карточка не найдена");
      error404.statusCode = 404;
      throw error404;
    })
    .then((deleted) => {
      res.send(deleted);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет карточки с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      const error404 = new Error("Карточка не найдена");
      error404.statusCode = 404;
      throw error404;
    })
    .then((card) => {
      res
        .status(200)
        .send({ message: "лайк был поставлен данной карточке", card });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет карточки с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      const error404 = new Error("Карточка не найдена");
      error404.statusCode = 404;
      throw error404;
    })
    .then((card) => {
      res
        .status(200)
        .send({ message: "дизлайк был поставлен данной карточке", card });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Нет карточки с таким id" });
        // айдишник валидный но ничего не найдено - 404
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "invalid id" });
      } else {
        res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
