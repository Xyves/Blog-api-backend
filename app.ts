const express = require("express");
const app = express();
import { Request, Response, NextFunction } from "express";
const bodyParser = require("body-parser");
const blogsRouter = require("./routes/blogsRouter");
const authRouter = require("./routes/authRouter");
const commentsRouter = require("./routes/commentsRouter");
const cors = require("cors");
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
