const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { HttpError } = require("../helpers");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Invalid token"));
  }

  jwt.verify(token, JWT_SECRET, async (err, decode) => {
    if (err) {
      next(HttpError(401, "Invalid token"));
    }

    req.user = {
      id: decode.id,
      name: decode.name,
    };

    const user = await User.findById(decode.id);
    if (user === null) {
      next(HttpError(401, "Invalid token"));
    }

    if (user.token !== token) {
      next(HttpError(401, "Invalid token"));
    }

    next();
  });
};

module.exports = authenticate;
