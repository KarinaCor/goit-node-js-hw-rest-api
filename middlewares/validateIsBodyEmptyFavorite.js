const { HttpError } = require("../helpers");

const validateIsBodyEmptyFavorite = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(404, "missing fields favorite");
  }
  next();
};

module.exports = { validateIsBodyEmptyFavorite };
