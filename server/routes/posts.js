import express from "express";
import PostsController from "../controllers/posts.controller.js";
import validateData from "../middlewares/validation.middleware.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", PostsController.getPosts) // reading data
router.post("/", validateData, authenticateUser, PostsController.createPost) // creating data
router.post("/like", authenticateUser, PostsController.updateLikeCount) // updating data
router.post("/update", validateData, authenticateUser, PostsController.updatePost) // updating data
router.delete("/", authenticateUser, PostsController.deletePost) // deleting data

export default router;