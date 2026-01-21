// * PACKAGES
import bcrypt from "bcryptjs";

// * MODELS
import User from "./models/user.model.js";

export const UpdateUser = async (req, res) => {
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
};
