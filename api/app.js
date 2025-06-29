const express = require("express");
const cors = require("cors");
const https = require("https");
const config = require("./config");
const apiRouter = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

// Создаем Express приложение
const app = express();

// Глобальный HTTPS агент
app.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    methods: config.cors.options.methods,
    allowedHeaders: config.cors.options.allowedHeaders,
    credentials: config.cors.options.credentials,
  })
);

// Маршруты
app.use("/api", apiRouter);

// Обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(config.app.port, () => {
  console.log(`Server running on http://localhost:${config.app.port}`);
});

module.exports = app;
