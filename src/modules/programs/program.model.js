// src/modules/programs/program.model.js
const mongoose = require("mongoose");

const programSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      expectedGuests: Number,

      status: {
        type: String,
        enum: [
          "UPCOMING",
          "PLANNING",
          "COMPLETED",
        ],
        default: "PLANNING",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Program",
  programSchema
);