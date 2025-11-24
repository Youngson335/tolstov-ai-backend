import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatController.processMessage);

export const chatRoutes = router;
