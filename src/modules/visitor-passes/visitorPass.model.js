// src/modules/visitor-passes/visitorPass.model.js
const mongoose = require("mongoose");

const visitorPassSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    visitorName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "family",
        "friend",
        "service",
        "delivery",
      ],
      required: true,
    },

    expectedDate: Date,

    expectedTime: String,

    passCode: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "UNUSED",
        "USED",
        "EXPIRED",
        "DENIED",
      ],
      default: "UNUSED",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "VisitorPass",
  visitorPassSchema
);