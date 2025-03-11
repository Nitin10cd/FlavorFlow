import express from 'express';
import { loginUser , registerUser , getUserInfo} from '../controller/UserController.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/userDetails',getUserInfo);

export default userRouter;