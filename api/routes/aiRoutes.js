import express from "express";
import aiController from "../controllers/aiController.js";

const router = express.Router();

router.post("/:uniqueName/ai-draft", aiController.setNewAiDrafts);
router.delete("/:uniqueName/ai-draft", aiController.deleteAiDraft);

export const aiRoutes = router;
