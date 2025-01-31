const { Contact } = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const userId = req.user.id;

  const contacts = await Contact.find({ ownerId: userId });
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const userId = req.user.id;
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  if (contact.ownerId.toString() !== userId) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addContactById = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    ownerId: req.user.id,
  };

  const newContact = await Contact.create(contact);
  if (!newContact) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(newContact);
};

const deleteContactById = async (req, res, next) => {
  const deletedContact = await Contact.findByIdAndDelete(req.params.contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContactById: ctrlWrapper(addContactById),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
