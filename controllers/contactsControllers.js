import { Types } from "mongoose";
import { asyncCatch } from "../helpers/asyncCatch.js";
import { Contacts } from "../models/contactsModel.js";

export const getAllContacts = asyncCatch(async (req, res) => {
  const list = await Contacts.find({owner: req.user.id});
  res.status(200).json(list);
});

export const getOneContact = asyncCatch(async (req, res, next) => {
  const getOne = await Contacts.findById(req.params.id);
  if(!getOne || getOne.owner.toString() !== req.iser.id){
    return res.status(404).json({message: 'Contact not found'});
  }
  res.json(getOne).status(200);
});

export const deleteContact = asyncCatch(async (req, res) => {
  const deleteContact = await Contacts.findByIdAndDelete(req.params.id);
  res.json(deleteContact).status(200);
});

export const createContact = asyncCatch(async (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user.id
  }
  const newUser = await Contacts.create(contact);
  if(!newUser){
    return res.status(400).json({message: 'Contact not found'});
  }
  res.status(200).json(newUser);
});

export const updateContact = asyncCatch(async (req, res, next) => {
  const update = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(update).status(200);
});

export const updateStatus = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const update = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(update);
});
