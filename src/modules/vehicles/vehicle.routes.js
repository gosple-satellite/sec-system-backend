// src/modules/vehicles/vehicle.routes.js
const express = require("express");
const auth = require("../../middleware/auth");
const {createVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle} = require("./vehicle.controller");
const router = express.Router();

router.use(auth);
router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;