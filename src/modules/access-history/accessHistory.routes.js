// src/modules/access-history/accessHistory.routes.js
const express = require("express");
const auth = require("../../middleware/auth");
const {getAccessHistory, createAccessLog} = require("./accessHistory.controller");
const router = express.Router();

router.use(auth);

router.get("/", getAccessHistory);
router.post("/", createAccessLog);

module.exports = router;