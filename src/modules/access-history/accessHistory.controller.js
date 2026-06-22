// src/modules/access-history/accessHistory.controller.js
const AccessHistory = require("./accessHistory.model");

exports.getAccessHistory =
  async (req, res) => {
    try {
      const logs =
        await AccessHistory.find({
          resident: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.createAccessLog =
  async (req, res) => {
    try {
      const log =
        await AccessHistory.create({
          ...req.body,
          resident: req.user.id,
        });

      res.status(201).json({
        success: true,
        data: log,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };