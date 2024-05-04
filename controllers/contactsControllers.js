import { Types } from "mongoose";
import { asyncCatch } from "../helpers/asyncCatch.js";
import { Contacts } from "../models/contactsModel.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = asyncCatch(async (req, res) => {
  const list = await Contacts.find({ owner: req.user.id });
  res.status(200).json(list);
});

export const getOneContact = asyncCatch(async (req, res, next) => {
  const { id } = rew.params;
  const owner = req.user.id;
  const getOne = await Contacts.findOne({ _id: id, owner });
  if (!getOne) throw new HttpError(404);
  res.json(getOne).status(200);
});

export const deleteContact = asyncCatch(async (req, res) => {
  const deleteContact = await Contacts.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id,
  });
  if (!deleteContact) throw new HttpError(404);
  res.json(deleteContact).status(200);
});

export const createContact = asyncCatch(async (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user.id,
  };
  const newUser = await Contacts.create(contact);
  if (!newUser) {
    return res.status(400).json({ message: "Contact not found" });
  }
  res.status(200).json(newUser);
});

export const updateContact = asyncCatch(async (req, res, next) => {
  const update = await Contacts.findOneAndUpdate(
    { _id: req.params.id, owner: req.user },
    req.body,
    { new: true }
  );
  if (!update) throw new HttpError(404);
  res.json(update).status(200);
});

export const updateStatus = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const update = await Contacts.findByIdAndUpdate(
    { _id: id, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (update) throw new HttpError(404);
  res.status(200).json(update);
});
