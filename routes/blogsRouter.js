const { Router } = require("express");
const blogRouter = Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middleware/authMiddleware");

blogRouter.get("/", postController.getPosts);
blogRouter.post("/", verifyToken, postController.createPost);
blogRouter.get("/:id", postController.getPost);
blogRouter.put("/:id", verifyToken, postController.updatePost);
blogRouter.delete("/:id", verifyToken, postController.deletePost);

module.exports = blogRouter;
