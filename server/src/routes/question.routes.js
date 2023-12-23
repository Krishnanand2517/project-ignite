import { Router } from "express";
import {
  addQuestion,
  getAllQuestions,
} from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllQuestions);

// PROTECTED ROUTES - authorization required
router.route("/add").post(verifyJWT, addQuestion);

export default router;
