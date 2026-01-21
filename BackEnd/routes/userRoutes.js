// * PACKAGES
import express from "express";
import { SignUp } from "../controllers/userControllers/signUp";
import { Login } from "../controllers/userControllers/login";
import { UpdateUser } from "../controllers/userControllers/updateUser";
import { DeleteUser } from "../controllers/userControllers/deleteUser";
import { GetUsers } from "../controllers/userControllers/getAllUsers";

const usersRouter = express.Router;

usersRouter.post("/SignUp", SignUp);
usersRouter.post("/Login", Login);
usersRouter.put("/updateUser/:id", UpdateUser);
usersRouter.delete("/deleteUser/:id", DeleteUser);
usersRouter.get("/getUsers", GetUsers);

export default usersRouter;
