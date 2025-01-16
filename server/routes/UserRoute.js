import express from "express";
import { upload, SignUp, Login } from "../controllers/UserController.js";
import { isLoggedInUser } from "../auth/UserAuth.js";

const router = express.Router();

router.post("/signup", upload.single("file"), SignUp)
router.post("/login",  Login);
router.get("/auth" ,isLoggedInUser)
;

export default router;
