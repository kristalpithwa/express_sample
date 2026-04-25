const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/restapi")
  .then(() => console.log("MongoDB connected 🚀"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Define a Mongoose schema and model for the user
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
  },
  { timestamps: true },
);

const users = mongoose.model("user", userSchema);

// Set up middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));

// get all users
app.get("/api/user", async (req, res) => {
  try {
    const data = await users.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// create new user
app.post("/api/user", async (req, res) => {
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
  } catch (error) {
    if (error.code === 11000) {
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
});

// get user by Id, update user, delete user
app
  .get("/api/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await users.findById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
  .patch("/api/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await users.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log("error =>", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
  .delete("/api/user/:id", async (req, res) => {
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
  });

app.listen(port, () => {
  console.log(`Server port ${port}`);
});
