const express = require("express");

const router = express.Router();
const users = require("../models/users");
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

router.get("/", getAllUsers).post("/", createUser);

router
  .get("/:id", getUserById)
  .patch("/:id", updateUserById)
  .delete("/:id", deleteUserById);

module.exports = router;
