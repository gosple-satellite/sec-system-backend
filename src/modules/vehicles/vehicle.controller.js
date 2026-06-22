// src/modules/vehicles/vehicle.controller.js
const Vehicle = require("./vehicle.model");
const logAccess = require("../../utils/accessLogger");
exports.createVehicle = async (
  req,
  res
) => {
  try {
    const vehicle =
      await Vehicle.create({
        ...req.body,
        resident: req.user.id,
      });

    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getVehicles = async (
  req,
  res
) => {
  try {
    const vehicles =
      await Vehicle.find({
        resident: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getVehicle = async (
  req,
  res
) => {
  try {
    const vehicle =
      await Vehicle.findOne({
        _id: req.params.id,
        resident: req.user.id,
      });

    res.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateVehicle = async (
  req,
  res
) => {
  try {
    const vehicle =
      await Vehicle.findOneAndUpdate(
        {
          _id: req.params.id,
          resident: req.user.id,
        },
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteVehicle = async (
  req,
  res
) => {
  try {
    await Vehicle.findOneAndDelete({
      _id: req.params.id,
      resident: req.user.id,
    });

    res.json({
      success: true,
      message:
        "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};