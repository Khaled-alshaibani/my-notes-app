// * MODELS
import Note from "./models/note.model.js";

// * EXTERNAL FUNCTIONS
import { protect } from "./middleware/auth.js";

export const ClearNote = async (req, res) => {
  try {
    const userId = req.user._id;
    await Note.deleteMany({ user: userId });

    req.user.notes = [];
    await req.user.save();

    res.status(200).json({
      success: true,
      msg: "All user notes deleted successfully",
      notes: [],
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error!" });
  }
};
