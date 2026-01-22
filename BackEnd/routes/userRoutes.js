// * PACKAGES
import express from "express";
import { SignUp} from "../controllers/userControllers/signUp.js"
import { Login } from "../controllers/userControllers/login.js";
import { UpdateUser } from "../controllers/userControllers/updateUser.js";
import { DeleteUser } from "../controllers/userControllers/deleteUser.js";
import { GetUsers } from "../controllers/userControllers/getAllUsers.js";

const usersRouter = express.Router();

usersRouter.post("/SignUp", SignUp);
usersRouter.post("/Login", Login);
usersRouter.put("/updateUser/:id", UpdateUser);
usersRouter.delete("/deleteUser/:id", DeleteUser);
usersRouter.get("/getUsers", GetUsers);

export default usersRouter;
