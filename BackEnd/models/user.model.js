import mongoose from "mongoose";
import { noteSchema } from "./note.model.js";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: [noteSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
