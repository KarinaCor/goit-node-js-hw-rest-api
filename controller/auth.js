const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("node:path");
const fs = require("node:fs/promises");
const Jimp = require("jimp");
const sendEmail = require("../helpers/sendEmail");

const { ctrlWrapper, HttpError } = require("../helpers");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const User = require("../models/user");

async function register(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verifyToken = crypto.randomUUID();

  await sendEmail({
    to: email,
    from: "mksmvkarina@gmail.com",
    subject: "Welcome to Contacts",
    html: `To confirm your registration please click on the <a href="http://localhost:3000/api/auth/verify/${verifyToken}">link</a>`,
    text: `To confirm your registration please open the link http://localhost:3000/api/auth/verify/${verifyToken}`,
  });

  const newUser = await User.create({
    email,
    verifyToken,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
}

const verify = async (req, res, next) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verifyToken: token });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

    res.send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (user.verify === false) {
    throw HttpError(401, "Your account is not verified");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const { subscription } = user;

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email, subscription },
  });
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  const picture = await Jimp.read(tempUpload);
  await picture.scaleToFit(250, 250).writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  login: ctrlWrapper(login),
  logOut: ctrlWrapper(logOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
