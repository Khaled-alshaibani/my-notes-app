import express from "express";
import { AddNote } from "../controllers/noteControllers/addNote";
import { ClearNote } from "../controllers/noteControllers/clearNote";
import { DeleteNote } from "../controllers/noteControllers/deleteNote";
import { GetAllNotes } from "../controllers/noteControllers/getAllNotes";
import { GetUserNotes } from "../controllers/noteControllers/getUserNotes";
import { UpdateNote } from "../controllers/noteControllers/updateNote";

const notesRouter = express.Router();

notesRouter.post("/addNote", protect, AddNote);
notesRouter.put("/clearUserNotes", protect, ClearNote);
notesRouter.delete("/deleteNote/:id", protect, DeleteNote);
notesRouter.get("/getNotes", GetAllNotes);
notesRouter.get("/users/:id/notes", GetUserNotes);
notesRouter.put("/updateNote/:id", protect, UpdateNote);

export default notesRouter;
