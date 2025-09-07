import mongoose from "mongoose";
import { noteSchema } from "./note.model.js";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    notes: [noteSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
