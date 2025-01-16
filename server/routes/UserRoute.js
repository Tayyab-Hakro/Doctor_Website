import express from "express";
import { upload, SignUp, Login } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup", upload.single("file"), SignUp)
router.post("/login",  Login);
;

export default router;
