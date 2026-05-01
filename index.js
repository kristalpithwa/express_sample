const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const connectDB = require("./config/db");
const userRouter = require("./router/userRouter");

// Connect to MongoDB
connectDB("mongodb://127.0.0.1:27017/restapi");

// Set up middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server port ${port}`);
});
