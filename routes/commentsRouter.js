const { Router } = require("express");
const passport = require("passport");
const router = Router();
const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware");
const commentsController = require("../controllers/comment_controller");
//Get  Specific comment by id
router.get("/comments/:commentId", commentsController.getCommentById);
// Get all comments on specific post
router.get("/:postId/comments", commentsController.getCommentsByPostId);
router.post("/:postId/comments", commentsController.createComment);
router.put("/comments/:commentId", commentsController.editComment);
router.delete("/comments/:commentId", commentsController.deleteComment);
// Get all comments by specific user
router.get("/users/:userId/comments", commentsController.getUserComments);
module.exports = router;
