const { db } = require("../db/query");
import { Request, Response, NextFunction } from "express";

const getPosts = (req: Request, res: Response, next: NextFunction) => {
  // const Post = db.getPost();
  res.json("Post");
};
const getPost = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const post = db.getPost(id);
  res.json(post);
};
const createPost = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, isPublished, userId } = req.body;
  const post = db.createPost(title, content, isPublished, userId);
  res.json(post);
};
const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const post = db.updatePost(id);
  res.json(post);
};
const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const id = "id";
  const post = db.deletePost(id);
  res.json(post);
};
module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
export interface Post {
  isPublished: boolean;
  title: String;
  id: String;
  authorId: String;
  comments: (string | number)[];
  created: Date;
}
