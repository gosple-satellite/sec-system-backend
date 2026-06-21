// src/modules/resident-dashboard/dashboard.routes.js
const express = require("express");

const auth = require(
  "../../middleware/auth"
);

const {
  getDashboard,
} = require("./dashboard.controller");

const router = express.Router();

router.get(
  "/dashboard",
  auth,
  getDashboard
);

module.exports = router;