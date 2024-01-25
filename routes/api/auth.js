const express = require("express");
const authMiddleware = require("../../middlewares/authenticate");

const { loginSchema } = require("../../schemas/userSchemas");
const ctrl = require("../../controller/auth");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

router.post("/register",  ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authMiddleware, ctrl.getCurrent);

router.post("/logout", authMiddleware, ctrl.logout);

module.exports = router;
