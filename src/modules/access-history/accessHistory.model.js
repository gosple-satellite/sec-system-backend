// src/modules/access-history/accessHistory.model.js
const mongoose = require("mongoose");
const accessHistorySchema =
  new mongoose.Schema(
    {
      resident: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      type: {
        type: String,
        enum: ["ENTRY", "EXIT"],
      },

      method: {
        type: String,
        enum: [
          "SMART_CARD",
          "VISITOR",
          "VEHICLE",
        ],
      },

      subject: String,

      gate: String,

      time: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "AccessHistory",
  accessHistorySchema
);