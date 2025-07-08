import { config } from "dotenv";
import cors from "cors";
import gigachat from "./gigachat.js";

config(); // Загружает переменные окружения

export default {
  app: {
    port: process.env.PORT || 3000,
  },
  cors: cors(),
  gigachat,
};
