// src/modules/resident-dashboard/dashboard.controller.js
const Vehicle = require("../vehicles/vehicle.model");
const VisitorPass = require("../visitor-passes/visitorPass.model");
const SmartCard = require("../smart-cards/smartCard.model");
const AccessHistory = require("../access-history/accessHistory.model");
exports.getDashboard =
  async (req, res) => {
    const residentId =
      req.user.id;

    const registeredVehicles =
      await Vehicle.countDocuments({
        resident: residentId,
      });

    const activeVisitorPasses =
      await VisitorPass.countDocuments({
        resident: residentId,
        status: "UNUSED",
      });

    const recentAccessLogs =
      await AccessHistory.countDocuments({
        resident: residentId,
      });

    const smartCard =
      await SmartCard.findOne({
        resident: residentId,
      });

    const upcomingVisitors =
      await VisitorPass.find({
        resident: residentId,
        status: "UNUSED",
      })
        .sort({
          expectedDate: 1,
        })
        .limit(5);

    const recentGateAccess =
      await AccessHistory.find({
        resident: residentId,
      })
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
      success: true,
      data: {
        registeredVehicles,
        activeVisitorPasses,
        recentAccessLogs,
        smartCardStatus:
          smartCard?.status ||
          "ACTIVE",
        upcomingVisitors,
        recentGateAccess,
      },
    });
  };