// middleware/gateOfficer.js
module.exports = (req, res, next) => {const allowed = ["GATE_OFFICER", "SUPER_ADMIN"];
  if (
    !allowed.includes(req.user.role)
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Access denied",
    });
  }

  next();
};