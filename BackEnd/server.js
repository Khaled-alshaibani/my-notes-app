import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

app.post("/postman", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const newUser = await User.create({ userName, password });

    res.json({ success: true, info: newUser });
  } catch (e) {
    console.log(`error: ${e}`);
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on 'http://localhost:${PORT}'`);
});
