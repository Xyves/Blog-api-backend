import express from "express";
const app = express();
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
// @ts-ignore
import blogsRouter from "./routes/blogsRouter";
// @ts-ignore

import authRouter from "./routes/authRouter";

// @ts-ignore

import commentsRouter from "./routes/commentsRouter";
// @ts-ignore

import cors from "cors";
app.use(cors());
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/posts/", blogsRouter);
app.use("/api", commentsRouter);
app.use("/api", authRouter);
app.all("*", async (req: Request, res: Response) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      msg: "No root matches your request",
      code: 404,
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
type ErrorResponse = {
  timestamp: number;
  msg: string;
  code: number;
};
