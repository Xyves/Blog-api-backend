const db = require("../db/query");
const express = require("express");

const getPosts = async (req: any, res: any) => {
  const Posts = await db.getDbPosts();
  console.log(Posts);
  res.json(Posts);
};
const getPost = async (req: any, res: any) => {
  const id = req.params.id;
  console.log(id);
  const post = await db.getDbPost(id);
  console.log(post);
  if (!post) {
    console.log("Post not found"); // Log when a post is not found
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
};
const createPost = async (req: any, res: any) => {
  const { title, content, isPublished, userId, categories } = req.body;
  const post = await db.createPost(
    title,
    content,
    isPublished,
    userId,
    categories
  );
  res.json(post);
};
const updatePost = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, content, isPublished, userId } = req.body;
  const post = await db.updatePost(id, title, content, isPublished, userId);
  res.json(post);
};
const deletePost = async (req: any, res: any) => {
  const id = req.params.id;
  const post = await db.deletePost(id);
  res.json(post);
};

export interface Post {
  isPublished: boolean;
  title: String;
  id: String;
  authorId: String;
  comments: (string | number)[];
  created: Date;
}
module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
