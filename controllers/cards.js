const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch(() => res.status(404).send({ message: "Запрашиваемый ресурс не найден" }));
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const error = new Error("CastError");
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "Нет карточки с таким id" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ err });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
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
      if (err.name === "CastError") {
        res.status(404).send({ message: "Нет карточки с таким id" });
        return;
      }
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};
