import { Router } from "express";
import { getInstructor } from "../controllers/instructor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-instructor").get(verifyJWT, getInstructor);

export default router;
