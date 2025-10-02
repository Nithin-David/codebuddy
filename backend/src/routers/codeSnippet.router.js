import express from "express";
import { createCodeSnippet } from "../controllers/codeSnippet.controller.js";
import { protectedRoute} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectedRoute, createCodeSnippet);
// router.get("/get", protectedRoute, getCodeSnippets);
// router.put("/update/:id", protectedRoute, updateCodeSnippet);
// router.delete("/delete/:id", protectedRoute, deleteCodeSnippet);
// router.post("/public/:id", protectedRoute, changeToPublicCode);


export default router;