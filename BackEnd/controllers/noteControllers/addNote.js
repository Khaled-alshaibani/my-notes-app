// * MODELS
import Note from "./models/note.model.js";

// * EXTERNAL FUNCTIONS
import { protect } from "./middleware/auth.js";

export const AddNote = async (req, res) => {
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
};
