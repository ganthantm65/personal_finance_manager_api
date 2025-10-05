import { registerUser,loginUser } from "../controller/AuthController.js";
import express from 'express';

const authRoutes=express.Router();

authRoutes.post('/register',registerUser);
authRoutes.post('/login',loginUser);

export default authRoutes;