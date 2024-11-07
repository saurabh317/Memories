import { Router } from "express";
import UserController from "../controllers/user.controller.js";

export const router = Router()

router.post('/register', UserController.registerUser)
router.post('/signIn', UserController.signIn)

export default router