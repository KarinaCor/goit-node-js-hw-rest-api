const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { HttpError } = require("../helpers");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  jwt.verify(token, JWT_SECRET, async (err, decode) => {
    if (err) {
      next(HttpError(401, "Not authorized"));
    }
     req.user = {
       _id: decode.id,
     };

    const user = await User.findById(decode.id);

    if (user === null || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
   
    next();
  });
};

module.exports = authenticate;
