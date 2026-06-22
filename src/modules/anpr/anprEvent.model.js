// src/modules/anpr/anprEvent.model.js
const mongoose = require("mongoose");

const anprEventSchema =
  new mongoose.Schema(
    {
      plate: String,

      confidence: Number,

      imageUrl: String,

      accessGranted: Boolean,

      gate: String,

      direction: String,

      vehicle: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "AnprEvent",
  anprEventSchema
);