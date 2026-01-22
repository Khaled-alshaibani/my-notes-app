// * MODELS
import Note from "../../models/note.model.js";

export const GetUserNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const notes = await Note.find({ creator: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      msg: "user notes retrieved successfully",
      notes,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "Server Error!" });
  }
};
