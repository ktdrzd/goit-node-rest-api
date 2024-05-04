import { Types, isValidObjectId } from "mongoose";
import { asyncCatch } from "../helpers/asyncCatch.js";
import HttpError from "../helpers/HttpError.js";
import { Contacts } from "../models/contactsModel.js";
import { loginSchema, signUpSchema } from "../schemas/authSchemas.js";
import { checkEmail } from "../services/usersServices.js";
import { verifyToken } from "../services/jwtServices.js";
import { User } from "../models/userModel.js";
import multer from "multer";
import { ImageService } from "../services/imageServices.js";

export const checkUserId = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) throw new HttpError(404);
  next();
});

export const checkUserBody = asyncCatch(async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "Body must have at least one field!");
  next();
});

export const checkFavorite = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new HttpError(404);

  if (req.body.favorite === undefined)
    throw new HttpError(400, "Favorite field is required");
  next();
});

export const checkUserDataSingUp = asyncCatch(async (req, res, next) => {
  const { value, errors } = signUpSchema(req.body);
  if (errors) throw new HttpError(400, errors.message);

  const emailCheck = await checkEmail(value.email);
  if (emailCheck) throw new HttpError(409, "Email in use");
  req.body = value;
  next();
});

export const checkUserDataLogIn = asyncCatch(async (req, res, next) => {
  const { value, errors } = loginSchema(req.body);
  console.log(errors);
  if (errors) throw new HttpError(400, errors);

  req.body = value;
  next();
});

export const authenticate = asyncCatch(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split("")[1]
    : null;
  if (!token) throw new HttpError(401);

  const id = verifyToken(token);
  const user = await User.findById(id);

  if (!user || !user.token || user.token !== token) throw new HttpError(401);
  req.user = user;
  next();
});

export const uploadAvatar = ImageService.initUploadImageMiddleware("avatars");