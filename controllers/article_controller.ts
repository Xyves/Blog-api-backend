const { db } = require("../db/query");
import { Request, Response, NextFunction } from "express";

const getArticles = (req: Request, res: Response, next: NextFunction) => {
  // const articles = db.getArticles();
  res.json("articles");
};
const getArticle = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const articleId = 1235;
  const article = db.getArticle(articleId);
  res.json(article);
};
const createArticle = (req: Request, res: Response, next: NextFunction) => {
  const article = db.createArticle();
  res.json("Some data");
};
const updateArticle = (req: Request, res: Response, next: NextFunction) => {
  const article = db.updateArticle();
  res.json();
};
const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
  const id = "id";
  const article = db.deleteArticle(id);
  res.json();
};
module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
export interface Article {
  isPublished: boolean;
  title: String;
  id: String;
  authorId: String;
  comments: (string | number)[];
  created: Date;
}
