import { Request, Response, NextFunction } from "express";
const { db } = require("../db/query");

const getComments = (req: Request, res: Response, next: NextFunction) => {
  const comments = db.getComments();
};
const getUserComments = (req: Request, res: Response, next: NextFunction) => {
  const comments = db.getUserComments();
};
const getCommentsByArticleId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comments = db.getUserComments();
};
interface Comment {
  id: String;
  userId: String;
  articleId: String;
  created: Date;
  message: String;
}
