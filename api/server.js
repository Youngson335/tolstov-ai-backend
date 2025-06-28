const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const { randomUUID } = require("crypto");

// Создаем кастомный агент для всех запросов
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Отключаем проверку сертификата (только для разработки!)
});

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Конфигурация
const CLIENT_ID = "2087ba9d-220d-497e-91b1-0f0935277d28";
const CLIENT_SECRET = "40a35ced-9634-4b9d-974e-5abefc81e391";
const AUTH_KEY = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
);

// Глобальная настройка axios для всех запросов
axios.defaults.httpsAgent = httpsAgent;

app.post("/api/chat", async (req, res) => {
  try {
    // 1. Получаем токен доступа
    const authResponse = await axios.post(
      "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
      new URLSearchParams({ scope: "GIGACHAT_API_PERS" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          RqUID: randomUUID(),
          Authorization: `Basic ${AUTH_KEY}`,
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // 2. Отправляем сообщение в GigaChat
    const chatResponse = await axios.post(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        model: "GigaChat",
        messages: [{ role: "user", content: req.body.message }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json({ response: chatResponse.data.choices[0].message.content });
  } catch (error) {
    console.error("Полная ошибка:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Ошибка при запросе к GigaChat",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
