// * MODELS
import Note from "../../models/note.model.js";

export const GetAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (!notes) {
      res.status(400).json({ success: false, msg: "There is no note yet!" });
    }

    res.status(200).json({ success: true, notes });
  } catch (e) {
    res.status(500).json({ success: false, msg: err.message });
  }
};
