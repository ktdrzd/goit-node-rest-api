import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  if (!token) throw new HttpError(401);
  try {
    const { id } = jwt.verify(token, process.env.JWT_TOKEN);
    return id;
  } catch (error) {
    throw new HttpError(401);
  }
};