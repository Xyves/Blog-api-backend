const { Router } = require("express");
const blogRouter = Router();
const {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController.js");

const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });
blogRouter.get("/", verifyToken, getPosts);
blogRouter.post("/", verifyToken, createPost);
blogRouter.get("/:id", getPost);
blogRouter.put("/:id", updatePost);
blogRouter.delete("/:id", deletePost);

module.exports = blogRouter;
