import express from "express";
import { upload, SignUp, Login, Logout, GetProfileData } from "../controllers/UserController.js";
import { isLoggedInUser } from "../auth/UserAuth.js";

const router = express.Router();

router.post("/signup", upload.single("file"), SignUp)
router.post("/login",  Login);
router.get("/logout" ,Logout)
router.get('/profile1/:id', GetProfileData); 



export default router;



