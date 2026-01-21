// * PACKAGES
import bcrypt from "bcryptjs";

// * MODELS
import User from "./models/user.model.js";

// * EXTERNAL FUNCTIONS
import generateToken from "./utils/generateToken.js";

export const Login = async (req, res) => {
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
};
