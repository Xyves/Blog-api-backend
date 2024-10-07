import { Router } from "express";
const blogRouter = Router();
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });
blogRouter.get("/", verifyToken, getPosts);
blogRouter.post("/", verifyToken, createPost);
blogRouter.get("/:id", getPost);
blogRouter.put("/:id", updatePost);
blogRouter.delete("/:id", deletePost);

export default blogRouter;
