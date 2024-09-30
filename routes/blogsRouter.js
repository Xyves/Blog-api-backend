const { Router } = require("express");
const passport = require("passport");
const blogRouter = Router();
const postController = require("../controllers/post_controller");

const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });
blogRouter.get("/", verifyToken, postController.getPosts);
blogRouter.post("/", postController.createPost);
blogRouter.get("/:id", postController.getPost);
blogRouter.put("/:id", postController.updatePost);
blogRouter.delete("/:id", postController.deletePost);

module.exports = blogRouter;
