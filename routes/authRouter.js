const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const authController = require("../controllers/auth_controller");

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
authRouter.get("user", authController.getUserById);
module.exports = authRouter;
