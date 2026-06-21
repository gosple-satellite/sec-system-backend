// src/modules/smart-cards/smartCard.routes.js
const express = require("express");

const auth = require(
  "../../middleware/auth"
);

const {
  getMyCard,
  freezeCard,
  createCard,
  scanCard,
} = require("./smartCard.controller");

const router = express.Router();

router.use(auth);
router.get("/me", getMyCard);
router.post("/freeze", freezeCard);
router.post("/", createCard);
router.post("/scan", scanCard);

module.exports = router;