const { db } = require("../db/query");

const getCommentById = (req: any, res: any) => {
  const { commentId } = req.params;
  const comment = db.getCommentById(commentId);
  res.json(comment);
};
const getUserComments = (req: any, res: any) => {
  const { userId } = req.params;
  const comments = db.getUserComments(userId);
  res.json(comments);
};
const createComment = (req: any, res: any) => {
  const { postId } = req.params;
  const { message, userId } = req.body;
  const comments = db.createComment(postId, message, userId);
  return comments;
};
const editComment = async (req: any, res: any) => {
  const { commentId } = req.params;
  const { message } = req.body;

  await db.editComment(commentId, message);
};
const deleteComment = async (req: any, res: any) => {
  const { commentId } = req.params;
  await db.deleteComment(commentId);
};
const getCommentsByPostId = async (req: any, res: any) => {
  const postId = req.params.postId;
  const id = req.params.id;
  console.log("Id is:" + id);
  console.log(postId);
  const comments = await db.getAllCommentsByPostId(postId);
  console.log(comments);
  if (!comments) {
    console.log("comments not found"); // Log when a post is not found
    return res.status(404).json({ error: "comments not found" });
  }

  res.json(comments);
};
export interface Comment {
  id: String;
  userId: String;
  articleId: String;
  created: Date;
  message: String;
}
module.exports = {
  getCommentById,
  getUserComments,
  createComment,
  editComment,
  deleteComment,
  getCommentsByPostId,
};
