"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
const users_1 = __importDefault(require("../models/users"));
async function getAllUsers(req, res) {
    try {
        const data = await users_1.default.find();
        res.json(data);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users" });
    }
}
async function createUser(req, res) {
    const { first_name, last_name, email, gender } = req?.body;
    const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
    };
    try {
        const result = await users_1.default.create(newUser);
        res.status(201).json({
            user: result,
            message: "User created successfully",
        });
    }
    catch (error) {
        if (error?.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const result = await users_1.default.findById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
async function updateUserById(req, res) {
    const { id } = req.params;
    try {
        const result = await users_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.log("error =>", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
async function deleteUserById(req, res) {
    const { id } = req.params;
    try {
        const result = await users_1.default.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({
                message: "User deleted successfully",
            });
        }
        else {
            res.status(404).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting user",
        });
    }
}
