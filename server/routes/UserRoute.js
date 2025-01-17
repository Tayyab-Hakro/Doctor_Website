import express from "express";
import { upload, SignUp, Login, Logout } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup", upload.single("file"), SignUp)
router.post("/login",  Login);
router.get("/logout" ,Logout)
;

export default router;
