// src/modules/smart-cards/smartCard.controller.js
const SmartCard = require("./smartCard.model");
const logAccess = require("../../utils/accessLogger");
const User = require("../auth/auth.model");

exports.getMyCard = async (
  req,
  res
) => {
  try {
    const card =
      await SmartCard.findOne({
        resident: req.user.id,
      });

    res.json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.freezeCard = async (
  req,
  res
) => {
  try {
    const card =
      await SmartCard.findOneAndUpdate(
        {
          resident: req.user.id,
        },
        {
          status: "FROZEN",
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      data: card,
      message:
        "Card frozen successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createCard = async (
  req,
  res
) => {
  try {
    const card =
      await SmartCard.create({
        ...req.body,
        resident: req.user.id,
      });

    res.status(201).json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.scanCard = async (
  req,
  res
) => {
  try {
    const { cardNumber, type } =
      req.body;

    const card =
      await SmartCard.findOne({
        cardNumber,
      });

    if (!card) {
      return res.status(404).json({
        success: false,
        message:
          "Smart card not found",
      });
    }

    if (card.status !== "ACTIVE") {
      return res.status(400).json({
        success: false,
        message:
          "Card is not active",
      });
    }

    const resident =
      await User.findById(
        card.resident
      );

    await logAccess({
      resident: card.resident,
      type:
        type === "EXIT"
          ? "EXIT"
          : "ENTRY",
      method: "SMART_CARD",
      subject: `${resident.firstName} ${resident.lastName}`,
    });

    res.json({
      success: true,
      message:
        "Card scanned successfully",
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};