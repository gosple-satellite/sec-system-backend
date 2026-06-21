// src/modules/vehicles/vehicle.model.js
const mongoose = require("mongoose");

const vehicleSchema =
  new mongoose.Schema(
    {
      resident: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      make: String,

      plate: {
        type: String,
        unique: true,
      },

      color: String,

      vehicleType: String,

      status: {
        type: String,
        enum: [
          "PENDING",
          "VERIFIED",
          "REJECTED",
        ],
        default: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Vehicle",
  vehicleSchema
);