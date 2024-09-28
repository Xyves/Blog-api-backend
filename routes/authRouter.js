const express = require("express");
const passport = require("passport");
const appRouter = express.Router();
const { login } = require("../controllers/auth_controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
appRouter.post("/login", login);
// appRouter.post("/signup", controller.getBlogById);
module.exports = appRouter;
