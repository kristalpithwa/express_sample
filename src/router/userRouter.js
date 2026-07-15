import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);

router
  .get("/:id", getUserById)
  .patch("/:id", updateUserById)
  .delete("/:id", deleteUserById);

export default router;
