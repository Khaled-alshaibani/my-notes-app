// * PACKAGES
import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// * MODELS AND FUNCTIONS
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import Note from "./models/note.model.js";
import generateToken from "./utils/generateToken.js";

// * =============== INITIALIZATIONS ================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ? |||||||||||||||||||||||||||||||||||||||| Users |||||||||||||||||||||||||||||||||||||

// * =============== Home ==============
app.get("/", (req, res) => {
  res.send("home");
});

// * ============= SIGNING UP ==============
app.post("/SignUp", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are needed!" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword, // <-- مهم: الحقل اسمه password
    });

    const token = generateToken(newUser._id); // استعمل id بعد الإنشاء
    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      token: newUser.token,
      createdAt: newUser.createdAt,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// * ============= GET ALL USERS ==============
app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users.userName);
    res.status(200).json(users);
  } catch (e) {
    console.log(`error: ${e}`);
  }
});

// * ============= LOGING IN ==============
app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User not found, try to sign up" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      id: user._id,
      userName: user.userName,
      email: user.email,
      token: user.token,
      createdAt: user.createdAt,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// * ============= UPDATING USER ==============
app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const { userName, email, oldPassword, newPassword } = req.body;
    const updates = {};

    if (userName) updates.userName = userName;
    if (email) updates.email = email;

    if (newPassword) {
      if (!oldPassword) {
        return res
          .status(400)
          .json({ success: false, msg: "Old password is required" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: "Old password is incorrect" });
      }

      updates.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      msg: "User Updated Successfully!",
      updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error!" });
  }
});

// * ============= DELETING USER ==============
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, msg: "User deleted successfully", deletedUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ? |||||||||||||||||||||||||||||||||||||||||||| NOTES |||||||||||||||||||||||||||||||||||||||||||

app.get("/notes", (req, res) => {
  res.send("Welcome to my notes!");
});

app.post("/addNote", async (req, res) => {
  try {
    const { userName, title, content } = req.body;
    if (!userName || !title || !content) {
      return res
        .status(400)
        .json({ success: false, msg: "missing credentials!" });
    }

    const creator = await User.findOne({ userName });
    if (!creator) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    }

    const newNote = await Note.create({
      title,
      content,
      creator: creator._id,
    });

    creator.notes.push(newNote); // إضافة النوت مع الـ id
    await creator.save();

    res.status(201).json({
      success: true,
      msg: `Note "${newNote.title}" was added successfully!`,
      newNote,
      notes: creator.notes, // إرجاع المصفوفة كاملة
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// * ========================================
app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on 'http://localhost:${PORT}'`);
});
