// * MODELS
import Note from "./models/note.model.js";

// * EXTERNAL FUNCTIONS
import { protect } from "./middleware/auth.js";

export const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, userId } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, msg: "Note not found" });
    }

    if (note.creator.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: "Not authorized to update this note" });
    }

    console.log("you're authorized");

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
};
