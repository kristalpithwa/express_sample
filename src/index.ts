import express from "express";
import cors from "cors";
import connectDB from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on 5000");
});

connectDB("mongodb://localhost:27017/user_management");

export default app;
