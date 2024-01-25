const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ctrlWrapper, HttpError } = require("../helpers");

const User = require("../models/user");

async function register(req, res, next) {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already used");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashPassword });
  res.send("Register");
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password invalid");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await User.findByIdAndUpdate(user._id, { token });

  res.send({ token });
};

const logOut = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { token: null });
  res.status(204).end();
  res.send("Logout");
  next();
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logOut),
  getCurrent: ctrlWrapper(getCurrent),
};
