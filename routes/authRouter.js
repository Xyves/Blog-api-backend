const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const authController = require("../controllers/auth_controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
authRouter.post("/login", authController.login);
authRouter.post(
  "/signup",
  // authController.createUserValidation(),
  authController.validateMiddleware,
  authController.signup
);
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
export default authRouter;
