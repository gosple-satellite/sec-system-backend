// src/middleware/auth.js
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const header =
      req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};