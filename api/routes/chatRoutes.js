import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.patch(
  "/:uniqueName/increment-messages",
  chatController.incrementMessages
);
router.patch("/:uniqueName/increment-session", chatController.setNumberSession);
router.post("/", chatController.processMessage);

export const chatRoutes = router;
