const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // validator - функция проверки данных.
        return /https*:\/\/[/\w.-]+/.test(v);
      },
      message: "Введите корректный url!",
    },
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
