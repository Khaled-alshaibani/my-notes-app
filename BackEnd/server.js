// * PACKAGES
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// * EXTERNAL FUNCTIONS
import { connectDB } from "./config/db.js";
import usersRouter from "./routes/userRoutes.js";
import notesRouter from "./routes/notesRoutes.js";

// * =============== INITIALIZATIONS ================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ? |||||||||||||||||||||||||||||||||||||||| Users |||||||||||||||||||||||||||||||||||||

app.use(usersRouter);
app.use(notesRouter);

// * ============= SIGNING UP ==============

// * ============= GET ALL USERS ==============

// * ============= LOGING IN ==============

// * ============= UPDATING USER ==============

// * ============= DELETING USER ==============

// ? |||||||||||||||||||||||||||||||||||||||||||| NOTES |||||||||||||||||||||||||||||||||||||||||||

// * ===================== Creating New Note =====================

// * ===================== Getting Notes =========================

// * ============================== Getting User Notes =========================

// * ============================== Updating Note ==============================

// * ============================== Deleting Note ==============================

// * ============================== Clearing User Notes ========================

// * ========================================
app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on 'http://localhost:${PORT}'`);
});
