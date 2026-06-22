// src/modules/dashboard/dashboard.routes.js
const express = require("express");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const {stats} = require("./dashboard.controller");
const router = express.Router();

router.get(
  "/stats",
  auth,
  admin,
  stats
);

module.exports = router;