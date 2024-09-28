const { Router } = require("express");
const passport = require("passport");
const appRouter = Router();
const articleController = require("../controllers/article_controller");
const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });
appRouter.get("/", verifyToken, articleController.getArticles);
appRouter.post("/", articleController.createArticle);
appRouter.get("/:id", articleController.getArticle);
appRouter.put("/:id", articleController.updateArticle);
appRouter.delete("/:id", articleController.deleteArticle);
module.exports = appRouter;
