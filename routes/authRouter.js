const express = require("express");
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
    res.redirect("/blogs");
  });
});
authRouter.get("/user/me", authController.getProfile);
authRouter.get("/user/:id", authController.getUser);
module.exports = authRouter;
