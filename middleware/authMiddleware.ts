const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
interface userAuthRequest extends Request {
  token: string; // or any other type
}
// export const verifyToken = (
//   req: userAuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const header = req.headers["authorization"];
//   if (typeof header !== "undefined") {
//     const bearer = header.split("");
//     const token = bearer[1];
//     req.token = token;
//     next();
//   } else {
//     return res.status(303).json({ error: "Access denied!" });
//   }
// };
// const verifyToken = (
//   req: userAuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token
//   if (!token) return res.status(401).json({ error: "Access Denied" });

//   try {
//     const verifiedUser = jwt.verify(token, process.env.SECRET_KEY); // Verify token
//     req.user = verifiedUser; // Attach user info to request object
//     next(); // Call the next middleware or route handler
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(400).json({ error: "Invalid Token" });
//   }
// };
