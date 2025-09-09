// * PACKAGES
import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// * MODELS
import User from "./models/user.model.js";
import Note from "./models/note.model.js";

// * EXTERNAL FUNCTIONS
import { connectDB } from "./config/db.js";
import generateToken from "./utils/generateToken.js";
import { protect } from "./middleware/auth.js";

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
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
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

// * ===================== Creating New Note =====================
app.post("/addNote", protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing credentials!" });
    }

    const newNote = await Note.create({
      title,
      content,
      creator: req.user._id,
    });

    req.user.notes.push(newNote);
    await req.user.save();

    res.status(201).json({
      success: true,
      msg: `Note "${newNote.title}" was added successfully!`,
      newNote,
      notes: req.user.notes,
    });
  } catch (e) {
    res.status(500).json({ success: false, msg: e.message });
  }
});

// * ===================== Getting Notes =========================
app.get("/getNotes", async (req, res) => {
  try {
    const notes = await Note.find();
    if (!notes) {
      res.status(400).json({ success: false, msg: "There is no note yet!" });
    }

    res.status(200).json({ success: true, notes });
  } catch (e) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// * ============================== Updating Note ==============================
app.put("/updateNote/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, msg: "Note not found" });
    }

    if (note.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: "Not authorized to update this note" });
    }

    if (title) note.title = title;
    if (content) note.content = content;

    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      msg: "Note was Updated Successfully",
      updatedNote,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error!" });
  }
});

// * ============================== Deleting Note ==============================
app.delete("/deleteNote/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, msg: "Note not found" });
    }

    if (note.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }

    await note.deleteOne();

    req.user.notes = req.user.notes.filter(
      (noteId) => noteId.toString() !== id
    );
    await req.user.save();

    res.status(200).json({
      success: true,
      msg: "Note was deleted successfully",
      notes: req.user.notes,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error!" });
  }
});

app.put("/clearUserNotes", protect, async (req, res) => {
  try {
    req.user.notes = [];
    await req.user.save();

    res.status(200).json({
      success: true,
      msg: "All notes references removed from your account",
      notes: req.user.notes,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error!" });
  }
});


// * ========================================
app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on 'http://localhost:${PORT}'`);
});
