import { Router } from "express";
import {
  getCurrent,
  logIn,
  logout,
  register,
  updateAvatar,
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signUpSchema } from "../schemas/authSchemas.js";
import {
  authenticate,
  checkUserDataLogIn,
  checkUserDataSingUp,
  uploadAvatar,
} from "../middlewares/userMiddlewares.js";

const usersRouter = Router();

usersRouter.post("/register", checkUserDataSingUp, register);
usersRouter.post("/login", checkUserDataLogIn, logIn);

usersRouter.post("/logout", authenticate, logout);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.patch("/avatars", authenticate, uploadAvatar, updateAvatar);

export default usersRouter;
