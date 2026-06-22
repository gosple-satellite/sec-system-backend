// src/modules/anpr/anpr.controller.js
const Vehicle = require("../vehicles/vehicle.model");
const logAccess = require("../../utils/accessLogger");

exports.scanPlate = async (
  req,
  res
) => {
  try {
    const {
      plate,
      confidence = 0,
      gate = "Main Gate",
      direction = "ENTRY",
    } = req.body;

    // Reject low-confidence reads
    if (confidence < 80) {
      return res.status(400).json({
        success: false,
        accessGranted: false,
        message:
          "Plate confidence too low",
      });
    }

    const vehicle =
      await Vehicle.findOne({
        plate: plate.toUpperCase(),
        status: "VERIFIED",
      });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        accessGranted: false,
        message:
          "Vehicle not recognized",
      });
    }

    await logAccess({
      resident: vehicle.resident,
      type: direction,
      method: "VEHICLE",
      subject: `${vehicle.make} (${vehicle.plate})`,
      gate,
    });

    res.json({
      success: true,
      accessGranted: true,
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};