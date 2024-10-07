const { Router } = require("express");
const blogRouter = Router();

const postController = require("../controllers/postController");
const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });
blogRouter.get("/", verifyToken, postController.getPosts);
blogRouter.post("/", verifyToken, postController.createPost);
blogRouter.get("/:id", postController.getPost);
blogRouter.put("/:id", postController.updatePost);
blogRouter.delete("/:id", postController.deletePost);

module.exports = blogRouter;
