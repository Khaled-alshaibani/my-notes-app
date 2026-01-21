// * MODELS
import User from "./models/user.model.js";
import Note from "./models/note.model.js";

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    await Note.deleteMany({ userId: id });

    res.status(200).json({
      success: true,
      msg: "User and notes deleted successfully",
      deletedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};
