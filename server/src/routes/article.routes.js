import { Router } from "express";
import { getArticle } from "../controllers/article.controller.js";

const router = Router();

router.route("/:slug").get(getArticle);

export default router;
