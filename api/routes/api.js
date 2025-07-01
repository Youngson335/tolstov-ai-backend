import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.options("/chat", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.status(200).send();
});

router.post("/chat", chatController.processMessage);

export default router;
