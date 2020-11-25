const router = require("express").Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
} = require("../controllers/cards.js");

router.get("/cards", getCards);
router.get("/cards/:id", getCard);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);

module.exports = router;
