const express = require("express");
const commentsRouter = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const commentsController = require("../controllers/comment_controller");

// Get all comments on specific post
commentsRouter.get("/:postId/comments", commentsController.getCommentsByPostId);
//Get  Specific comment by id
commentsRouter.get("/comments/:commentId", commentsController.getCommentById);
commentsRouter.post(
  "/:postId/comments",
  // verifyToken,
  commentsController.createComment
);
commentsRouter.put(
  "/comments/:commentId",
  verifyToken,
  commentsController.editComment
);
commentsRouter.delete(
  "/comments/:commentId",
  verifyToken,
  commentsController.deleteComment
);
// Get all comments by specific user
commentsRouter.get(
  "/users/:userId/comments",
  commentsController.getUserComments
);
module.exports = commentsRouter;
