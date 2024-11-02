const db = require("../db/query");
const jwt = require("jsonwebtoken");
const { createUser, getUserByName, getUserById } = require("../db/query");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
async function login(req: any, res: any) {
  console.log("Attempting login");
  try {
    const { password, nickname } = req.body;

    const user = await getUserByName(nickname);
    console.log("User found:", user.nickname);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed: user not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Incorrect password" });
    }

    console.log("Username and password worked");

    // Generate JWT token
    const secret = process.env.SECRET_KEY;
    jwt.sign(
      { user: { id: user.id, nickname: user.nickname, role: user.role } },
      secret,
      { expiresIn: "30m" },
      (err: any, token: string) => {
        if (err) {
          console.error("Error generating token:", err);
          return res.status(500).json({ error: "Error generating token" });
        }
        res.json({ token }); // Return the token
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}
async function signup(req: any, res: any) {
  const { nickname, password, email, role } = req.body;
  if (!nickname || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await createUser(nickname, hashedPassword, email, role);

    const token = jwt.sign(
      {
        userId: user.userId,
        nickname: nickname,
        email,
        password: hashedPassword,
        role: role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    res.status(201).json({ token });
    res.redirect("/");
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Error creating user" });
  }
}
async function getUser(req: any, res: any) {
  const { id } = req.params;
  const user = await getUserById(id);
  res.json(user);
}
function createUserValidation() {
  return [
    body("nickname")
      .isLength({ min: 3, max: 20 })
      .withMessage("username must be between 3 and 20 characters")
      .not()
      .contains(" ")
      .withMessage("Username should not contain spaces"),

    body("password")
      .isLength({ min: 5, max: 15 })
      .withMessage("Password must be between 6 and 15 characters")
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,15}$/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    body("passwordConfirmation").custom(
      (value: string, { req }: { req: any }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }
    ),
  ];
}
function validateMiddleware(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
function getProfile(req: any, res: any) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("No token found, access denied");
    return res.status(401).send("Access Denied");
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Verified user:", verifiedUser.user);
    if (!verifiedUser) {
      console.error("User not found in database");
      return res.status(404).send("User not found");
    }
    res.json({
      id: verifiedUser.user.id,
      nickname: verifiedUser.user.nickname,
      role: verifiedUser.user.role,
    });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}
module.exports = {
  login,
  getProfile,
  signup,
  validateMiddleware,
  createUserValidation,
  getUser,
};
