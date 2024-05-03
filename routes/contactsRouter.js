import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  patchContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  authenticate,
  checkFavorite,
  checkUserBody,
  checkUserId,
} from "../middlewares/userMiddlewares.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);
contactsRouter.get("/", getAllContacts);

contactsRouter.use("/:id", checkUserId);
contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(checkUserBody, validateBody(updateContactSchema), updateContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.patch(
  "/:id/favourite",
  validateBody(patchContactSchema),
  checkFavorite,
  updateStatus
);

export default contactsRouter;
