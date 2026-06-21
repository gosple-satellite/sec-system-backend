// src/modules/smart-cards/smartCard.model.js
const mongoose = require("mongoose");

const smartCardSchema =
  new mongoose.Schema(
    {
      resident: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      cardNumber: String,

      linkedEstate: String,

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "FROZEN",
          "LOST",
        ],
        default: "ACTIVE",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "SmartCard",
  smartCardSchema
);