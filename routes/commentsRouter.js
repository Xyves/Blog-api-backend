const express = require("express");
const commentsRouter = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const commentsController = require("../controllers/comment_controller");

//Get  Specific comment by id
commentsRouter.get("/comments/:commentId", commentsController.getCommentById);
// Get all comments on specific post
commentsRouter.get("/:postId/comments", commentsController.getCommentsByPostId);
commentsRouter.post("/:postId/comments", commentsController.createComment);
commentsRouter.put("/comments/:commentId", commentsController.editComment);
commentsRouter.delete("/comments/:commentId", commentsController.deleteComment);
// Get all comments by specific user
commentsRouter.get(
  "/users/:userId/comments",
  commentsController.getUserComments
);
module.exports = commentsRouter;
