import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  patchContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";
import {
  checkFavorite,
  checkUserBody,
  checkUserId,
} from "../middlewares/userMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkUserId);

contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(checkUserBody, validateBody(updateContactSchema), updateContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(patchContactSchema),
  checkFavorite,
  updateStatus
);

export default contactsRouter;
