// src/modules/users/user.routes.js
const express = require("express");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const {getUsers, getUser, createUser, updateUser, deleteUser} = require("./user.controller");
const router = express.Router();

router.use(auth, admin);

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;