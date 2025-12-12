import jwt from "jsonwebtoken";
import express from "express";
import { 
    registerUser, 
    loginUser, 
} from "../controller/AuthController.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;
