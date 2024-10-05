const express = require("express");
const passport = require("passport");
const appRouter = express.Router();
const authController = require("../controllers/auth_controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
appRouter.post("/login", authController.login);
appRouter.post("/signup", authController.signup);
module.exports = appRouter;
