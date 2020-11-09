const path = require("path");

const readFile = require("../utils/read-file");

const pathToData = path.join(__dirname, "..", "data", "cards.json");

module.exports.getCards = (req, res) => {
  readFile(pathToData)
    .then((data) => res.send(data))
    .catch(() => res.status(404).send({ message: "Данный файл не существует" }));
};

module.exports.getCard = (req, res) => {
  const { id } = req.params;
  readFile(pathToData)
    .then((data) => {
      const card = data.find((item) => item._id === id);
      if (!card) {
        return res.status(404).send({ message: "Нет карточки с таким id" });
      }
      return res.send(card);
    })
    .catch(() => res.status(404).send({ message: "Данный файл не существует" }));
};
