import express from "express";
import cors from "cors";
import connectDB from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());

connectDB(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.8.3",
);

app.listen(5000, () => {
  console.log("Server running on 5000");
});

export default app;
