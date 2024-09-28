import { Request, Response, NextFunction } from "express";
const { db } = require("../db/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
export async function login(req: Request, res: Response) {
  try {
    // const { email, password, nickname } = req.body;
    const password = "I hate myself";
    const user = {
      nickname: "Josd",
      password: "I hate myself",
      email: "Emily@gmail.com",
    };
    // const user = db.getUserByName(nickname);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed user" });
    }
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) {
    //   return res.status(401).json({ error: "Authentication failed password" });
    // }
    console.log("username and password worked");
    // Generate JWT token
    const secret = process.env.SECRET_KEY;
    jwt.sign(
      { user },
      "secretkey",
      { expiresIn: "30s" },
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
export async function signup(req: Request, res: Response) {
  const { nickname, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  await db.createUser(nickname, hashedPassword, email);
}
