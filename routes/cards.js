const router = require("express").Router();
const { getCards, getCard } = require("../controllers/cards.js");

router.get("/", getCards);
router.get("/:id", getCard);

module.exports = router;
