const path = require("path");

const readFile = require("../utils/read-file");

const pathToData = path.join(__dirname, "..", "data", "users.json");

module.exports.getUsers = (req, res) => {
  readFile(pathToData)
    .then((data) => res.send(data))
    .catch(() => res.status(404).send({ message: "Данный файл не существует" }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  readFile(pathToData)
    .then((data) => {
      const user = data.find((item) => item._id === id);
      if (!user) {
        return res.status(404).send({ message: "Нет пользователя с таким id" });
      }
      return res.send(user);
    })
    .catch(() => res.status(404).send({ message: "Данный файл не существует" }));
};
