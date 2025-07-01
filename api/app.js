import express from "express";
import cors from "cors"; // Импортируем прямо из пакета cors
import corsOptions from "./config/cors.js";
import config from "./config/index.js";
import router from "./routes/api.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Маршруты
app.use("/api", router);

// Обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(config.app.port, () => {
  console.log(`Server running on http://localhost:${config.app.port}`);
});

export default app;
