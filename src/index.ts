import express from "express";
import cors from "cors";
// import connectDB from "./config/db";
// import userRouter from "./router/userRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on 5000");
});

// connectDB();

export default app;
