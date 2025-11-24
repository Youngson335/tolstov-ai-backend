import express from "express";
import { chatRoutes } from "./chatRoutes.js";

const router = express.Router();

// Простые маршруты без сложной логики
router.use("/chat", chatRoutes);

// Универсальный OPTIONS handler
router.options("*", (req, res) => res.status(200).end());

export default router;
