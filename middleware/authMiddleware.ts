const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
interface userAuthRequest extends Request {
  token: string; // or any other type
}
export const verifyToken = (
  req: userAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split("");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    return res.status(303).json({ error: "Access denied!" });
  }
};
