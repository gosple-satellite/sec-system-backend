// src/modules/estates/estate.model.js
const mongoose = require("mongoose");
const estateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    address: String,

    units: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "MAINTENANCE",
      ],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Estate",
  estateSchema
);