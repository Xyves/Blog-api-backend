import { Request, Response, NextFunction } from "express";
const { db } = require("../db/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function login(req: Request, res: Response) {
  try {
    const { email, password, nickname } = req.body;

    const user = db.getUserByName(nickname, password);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed user" });
    }
    console.log("username and password worked");

    // Generate JWT token
    const secret = process.env.SECRET_KEY;
    jwt.sign(
      { user },
      secret,
      { expiresIn: "30m" },
      (err: any, token: String) => {
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}
async function signup(req: Request, res: Response) {
  const { nickname, password, email, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  await db.createUser(nickname, hashedPassword, email, role);
}
module.exports = { login, signup };
