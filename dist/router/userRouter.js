"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.get("/", users_1.getAllUsers).post("/", users_1.createUser);
router
    .get("/:id", users_1.getUserById)
    .patch("/:id", users_1.updateUserById)
    .delete("/:id", users_1.deleteUserById);
exports.default = router;
