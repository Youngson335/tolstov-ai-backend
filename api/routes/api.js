import express from "express";
import { userRoutes } from "./userRoutes.js";
import { chatRoutes } from "./chatRoutes.js";
import { aiRoutes } from "./aiRoutes.js";

const router = express.Router();

// Простые маршруты без сложной логики
router.use("/chat", chatRoutes);
router.use("/user", userRoutes);
router.use("/ai", aiRoutes);

// Универсальный OPTIONS handler
router.options("*", (req, res) => res.status(200).end());

export default router;
