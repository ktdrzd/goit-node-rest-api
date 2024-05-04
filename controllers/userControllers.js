import HttpError from "../helpers/HttpError.js";
import { asyncCatch } from "../helpers/asyncCatch.js";
import { User } from "../models/userModel.js";
import { checkUser, signUp, updateImages } from "../services/usersServices.js";

export const register = asyncCatch(async (req, res) => {
  const newUser = await signUp(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const logIn = asyncCatch(async (req, res) => {
  const user = await checkUser(req.body);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logout = asyncCatch(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).send;
});

export const getCurrent = asyncCatch(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
});

export const updateAvatar = asyncCatch(async (req, res) => {
  if (req.file === undefined)
    throw new HttpError(400, "Field of avatar with file not found");
  const user = await updateImages(req.body, req.user, req.file);
  res.status(200).json({ avatarURL: user.avatarURL });
});
