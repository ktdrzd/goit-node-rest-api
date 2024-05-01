import {
  getListContacts,
  getOneContactById,
  deleteContactById,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";
import { asyncCatch } from "../helpers/asyncCatch.js";

export const getAllContacts = asyncCatch(async (req, res) => {
  const list = await getListContacts();
  res.json(list);
});

export const getOneContact = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const contact = await getOneContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact).status(200);
});

export const deleteContact = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const contact = await deleteContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact).status(200);
});

export const createContact = asyncCatch(async (req, res) => {
  const dataNewContact = req.body;
  const newContact = await addContact(dataNewContact);
  if (!newContact) {
    return res.status(404).json({ message: "Contact not created" });
  }
  res.status(201).json(newContact);
});

export const updateContact = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const update = await updateContactById(id, data);
  if (Object.keys(data).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
  }
  if (!update) {
    return res.status(400).json({ message: "Not found" });
  }
  res.json(update).status(200);
});
