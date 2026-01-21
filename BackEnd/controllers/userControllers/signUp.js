// * PACKAGES
import bcrypt from "bcryptjs";


// * MODELS
import User from "./models/user.model.js";

// * EXTERNAL FUNCTIONS
import generateToken from "./utils/generateToken.js";



export const SignUp = async (req, res) => {
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
};
