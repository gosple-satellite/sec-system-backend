// src/modules/auth/auth.routes.js
const express = require("express");

const auth = require("../../middleware/auth");

const {
  register,
  login,
  logout,
  me,
  refresh,
  forgotPassword,
  resetPassword,
} = require("./auth.controller");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password",
  resetPassword
);
router.get("/me", auth, me);
router.post("/refresh", refresh);
router.post(
  "/logout",
  auth,
  logout
);

module.exports = router;