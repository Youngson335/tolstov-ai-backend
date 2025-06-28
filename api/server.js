const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const { randomUUID } = require("crypto");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const CLIENT_ID = "2087ba9d-220d-497e-91b1-0f0935277d28";
const CLIENT_SECRET = "40a35ced-9634-4b9d-974e-5abefc81e391";
const AUTH_KEY = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
);

axios.defaults.httpsAgent = httpsAgent;

// Кеш для токена и времени его получения
let tokenCache = {
  accessToken: null,
  expiresAt: null,
};

// Функция для получения токена
async function getAccessToken() {
  // Если токен есть и еще не истек, возвращаем его
  if (tokenCache.accessToken && tokenCache.expiresAt > Date.now()) {
    return tokenCache.accessToken;
  }

  try {
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

    // Обновляем кеш: устанавливаем время истечения на 25 минут (1500 сек)
    // вместо 30 минут, чтобы избежать ошибок
    tokenCache = {
      accessToken: authResponse.data.access_token,
      expiresAt: Date.now() + 25 * 60 * 1000, // 25 минут в миллисекундах
    };

    return tokenCache.accessToken;
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    throw error;
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    // Получаем токен (автоматически обновится если нужно)
    const accessToken = await getAccessToken();

    // Отправляем сообщение в GigaChat
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
    console.error("Ошибка:", {
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
