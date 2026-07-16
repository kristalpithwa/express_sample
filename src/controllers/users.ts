import { Request, Response } from "express";
import users from "../models/users";

async function getAllUsers(req: Request, res: Response) {
  try {
    const data = await users.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
}

async function createUser(req: Request, res: Response) {
  const { first_name, last_name, email, gender } = req?.body;

  const newUser = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
  };

  try {
    const result = await users.create(newUser);
    res.status(201).json({
      user: result,
      message: "User created successfully",
    });
  } catch (error: any) {
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

async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await users.findById(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error: any) {
    console.log("error =>", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await users.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
    });
  }
}

export { getAllUsers, createUser, getUserById, updateUserById, deleteUserById };
