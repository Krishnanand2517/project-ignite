import { Router } from "express";
import {
  registerAccount,
  loginAccount,
  logoutAccount,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentAccount,
  updateAccountDetails,
  updateAccountAvatar,
  deleteAccount,
} from "../controllers/account.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerAccount);

router.route("/login").post(loginAccount);

// PROTECTED ROUTES - authorization required
router.route("/logout").post(verifyJWT, logoutAccount);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-account").get(verifyJWT, getCurrentAccount);
router.route("/update-details").post(verifyJWT, updateAccountDetails);

router
  .route("/update-avatar")
  .post(verifyJWT, upload.single("avatar"), updateAccountAvatar);

router.route("/delete").delete(verifyJWT, deleteAccount);

export default router;
