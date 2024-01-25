const express = require("express");
const validateBody = require("../../middlewares/validateBody.js");
const {
  validateIsBodyEmpty,
} = require("../../middlewares/validateIsBodyEmpty.js");
const {
  validateIsBodyEmptyFavorite,
} = require("../../middlewares/validateIsBodyEmptyFavorite.js");
const isValidId = require("../../middlewares/isValidId.js");
const ctrl = require("../../controller/contacts.js");

const {
  contactAddSchema,
  contactUpdateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts.js");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(contactAddSchema), ctrl.addContactById);

router.delete("/:contactId", ctrl.deleteContactById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateIsBodyEmptyFavorite,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

router.put(
  "/:contactId",

  validateBody(contactUpdateSchema),
  validateIsBodyEmpty,
  ctrl.updateContactById
);

module.exports = router;
