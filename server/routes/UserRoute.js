import express from "express"
import { SignUp } from "../controllers/UserController.js"
import { upload } from "../controllers/UserController.js"
const UserRouter = express.Router()
UserRouter.route('/Signup')
  .post(upload.single('profileImage'), SignUp);


export default UserRouter