const db = require("../db/query");
import { Request, Response, NextFunction } from "express";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const Posts = await db.getDbPosts();
  console.log(Posts);
  res.json(Posts);
};
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const post = await db.getPost(id);
  if (!post) {
    console.log("Post not found"); // Log when a post is not found
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
};
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, isPublished, userId } = req.body;
  const post = await db.createPost(title, content, isPublished, userId);
  res.json(post);
};
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, content, isPublished, userId } = req.body;
  const post = await db.updatePost(id, title, content, isPublished, userId);
  res.json(post);
};
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const post = await db.deletePost(id);
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
