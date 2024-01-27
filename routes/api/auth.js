const express = require("express");
const authMiddleware = require("../../middlewares/authenticate");

const { userSchema } = require("../../schemas/userSchemas");
const ctrl = require("../../controller/auth");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

router.post("/register", validateBody(userSchema), ctrl.register);

router.post("/login", validateBody(userSchema), ctrl.login);

router.get("/current", authMiddleware, ctrl.getCurrent);

router.post("/logout", authMiddleware, ctrl.logout);

module.exports = router;
