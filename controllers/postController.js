const { db } = require("../db/query.ts");

const getPosts = (req, res, next) => {
  // const Post = db.getPost();
  res.json("Post");
};
const getPost = (req, res, next) => {
  const { id } = req.params;
  const post = db.getPost(id);
  res.json(post);
};
const createPost = (req, res, next) => {
  const { title, content, isPublished, userId } = req.body;
  const post = db.createPost(title, content, isPublished, userId);
  res.json(post);
};
const updatePost = (req, res, next) => {
  const { id } = req.params;
  const post = db.updatePost(id);
  res.json(post);
};
const deletePost = (req, res, next) => {
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
// export interface Post {
//   isPublished: boolean;
//   title: String;
//   id: String;
//   authorId: String;
//   comments: (string | number)[];
//   created: Date;
// }
