const mongoose = require("mongoose");

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

module.exports = users;
