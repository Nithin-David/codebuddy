import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js"
import { createComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create_comment/:id", protectedRoute, createComment);

export default router;
