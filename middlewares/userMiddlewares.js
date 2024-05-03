import { Types } from "mongoose";
import { asyncCatch } from "../helpers/asyncCatch.js";
import HttpError from "../helpers/HttpError.js";
import { Contacts } from "../models/userModel.js";

export const checkUserId = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) throw new HttpError(404);
  const user = await Contacts.findById(id);
  if (!user) throw new HttpError(404);
  req.user = user;
  next();
});

export const checkUserBody = asyncCatch(async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "Body must have at least one field");
  next();
});

export const checkFavorite = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await Contacts.findById(id);
  if (!user) throw new HttpError(404);
  if (req.body.favorite === undefined)
    throw new HttpError(400, "Favorite field is missing");
  next();
});
