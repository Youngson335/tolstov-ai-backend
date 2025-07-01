import { config } from "dotenv";
import corsOptions from "./cors.js";
import gigachat from "./gigachat.js";

config(); // Загружает переменные окружения

export default {
  app: {
    port: process.env.PORT || 3000,
  },
  cors: corsOptions,
  gigachat,
};
