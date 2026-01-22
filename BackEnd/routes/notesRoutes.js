import express from "express";
import { AddNote } from "../controllers/noteControllers/addNote.js";
import { ClearNote } from "../controllers/noteControllers/clearNote.js";
import { DeleteNote } from "../controllers/noteControllers/deleteNote.js";
import { GetAllNotes } from "../controllers/noteControllers/getAllNotes.js";
import { GetUserNotes } from "../controllers/noteControllers/getUserNotes.js";
import { UpdateNote } from "../controllers/noteControllers/updateNote.js";
import { protect } from "../middleware/auth.js";

const notesRouter = express.Router();

notesRouter.post("/addNote", protect, AddNote);
notesRouter.put("/clearUserNotes", protect, ClearNote);
notesRouter.delete("/deleteNote/:id", protect, DeleteNote);
notesRouter.get("/getNotes", GetAllNotes);
notesRouter.get("/users/:id/notes", GetUserNotes);
notesRouter.put("/updateNote/:id", protect, UpdateNote);

export default notesRouter;
