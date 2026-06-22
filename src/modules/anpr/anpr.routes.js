// src/modules/anpr/anpr.routes.js
const express = require("express");
const auth = require("../../middleware/auth");
const gateOfficer = require("../../middleware/gateOfficer");
const {scanPlate} = require("./anpr.controller");

const router = express.Router();
router.post("/scan", auth, gateOfficer, scanPlate);

module.exports = router;