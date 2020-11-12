const router = require("express").Router();
const { getCards, getCard } = require("../controllers/cards.js");

router.get("/cards", getCards);
router.get("/cards/:id", getCard);

module.exports = router;
