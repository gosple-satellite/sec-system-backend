// src/modules/dashboard/dashboard.controller.js
const User = require("../auth/auth.model");
const Estate = require("../estates/estate.model");
const Program = require("../programs/program.model");
exports.stats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const residents =
      await User.countDocuments({
        role: "RESIDENT",
      });

    const estates =
      await Estate.countDocuments();

    const programs =
      await Program.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        residents,
        estates,
        programs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};