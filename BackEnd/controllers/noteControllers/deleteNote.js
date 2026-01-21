// * MODELS
import Note from "./models/note.model.js";

// * EXTERNAL FUNCTIONS
import { protect } from "./middleware/auth.js";

export const DeleteNote = async (req, res) => {
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
      (noteId) => noteId.toString() !== id,
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
};
