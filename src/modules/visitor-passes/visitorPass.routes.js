// src/modules/visitor-passes/visitorPass.routes.js
const express = require("express");

const auth = require(
  "../../middleware/auth"
);

const {
  createPass,
  getPasses,
  getPass,
  updatePass,
  deletePass,
  verifyPass,
  getStatus,
  usePass,
} = require("./visitorPass.controller");

const router = express.Router();

router.get("/verify/:passCode", verifyPass);
router.get("/status/:phoneOrCode", getStatus);
router.use(auth);
router.post("/", createPass);
router.get("/", getPasses);
router.get("/:id", getPass);
router.put("/:id", updatePass);
router.post("/use/:passCode", usePass);
router.delete("/:id", deletePass);

module.exports = router;