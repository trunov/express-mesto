const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find()
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((cards) => res.send(cards))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "Нет карточек" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "Нет карточки с таким id" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({
            message: "в запросе переданы значения неправильного типа",
          });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((card) => {
      res.status(200).send({ message: "карточка удалена", card });
    })
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "нет карточки с таким id" });
          break;
        default:
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
      const error = new Error("CastError");
      throw error;
    })
    .then((card) => {
      res
        .status(200)
        .send({ message: "лайк был поставлен данной карточке", card });
    })
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "нет карточки с таким id" });
          break;
        default:
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
      const error = new Error("CastError");
      throw error;
    })
    .then((card) => {
      res
        .status(200)
        .send({ message: "дизлайк был поставлен данной карточке", card });
    })
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(400).send({ message: err.message });
          break;
        case "CastError":
          res.status(404).send({ message: "нет карточки с таким id" });
          break;
        default:
          res.status(500).send({ message: "Ошибка на стороне сервера" });
      }
    });
};
