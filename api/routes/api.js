const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController.js");
const { cors } = require("../config");

// Настройка CORS для конкретного маршрута
router.options("/chat", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", cors.allowedOrigins.join(","));
  res.setHeader("Access-Control-Allow-Methods", cors.options.methods.join(","));
  res.setHeader(
    "Access-Control-Allow-Headers",
    cors.options.allowedHeaders.join(",")
  );
  res.status(200).end();
});

router.post("/chat", chatController.processMessage);

module.exports = router;
