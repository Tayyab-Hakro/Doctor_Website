import express from "express";
import { upload, SignUp } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup", upload.single("file"), SignUp);

export default router;
