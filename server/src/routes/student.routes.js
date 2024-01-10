import { Router } from "express";
import { getStudent } from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// PROTECTED ROUTES - authorization required
router.route("/get-student").get(verifyJWT, getStudent);

export default router;
