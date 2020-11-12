const express = require("express");

const path = require("path");

const routes = require("./routes/index");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => { console.log(`listening to port: ${PORT}`); });
