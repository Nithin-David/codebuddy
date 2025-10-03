import express from "express";
import { changeToPublicCode, createCodeSnippet, deleteCodeSnippet, getAllPublicSnippets, getCodeSnippets, toggleSavedSnippet, updateCodeSnippet } from "../controllers/codeSnippet.controller.js";
import { protectedRoute} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectedRoute, createCodeSnippet);
router.get("/get", protectedRoute, getCodeSnippets);
router.put("/update/:id", protectedRoute, updateCodeSnippet);
router.delete("/delete/:id", protectedRoute, deleteCodeSnippet);
router.post("/toggle_saved/:id", protectedRoute, toggleSavedSnippet);
router.post("/change_public/:id", protectedRoute, changeToPublicCode);
router.post("/public", protectedRoute, getAllPublicSnippets);


export default router;