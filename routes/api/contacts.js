const express = require("express");
const validateBody = require("../../middlewares/validateBody.js");
const {validateIsBodyEmpty} = require("../../middlewares/validateIsBodyEmpty.js");
const { validateIsBodyEmptyFavorite } = require("../../middlewares/validateIsBodyEmptyFavorite.js");
const isValidId = require("../../middlewares/isValidId.js");

const {
  contactAddSchema,
  contactUpdateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts.js");

const {
  getById,
  getAll,
  addContactById,
  deleteContactById,
  updateContactById,
  updateFavorite,
} = require("../../controller/contacts.js");


const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactAddSchema), addContactById);

router.delete("/:contactId", deleteContactById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateIsBodyEmptyFavorite,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

router.put(
  "/:contactId",
  validateBody(contactUpdateSchema),
  validateIsBodyEmpty,
  updateContactById
);

module.exports = router;
