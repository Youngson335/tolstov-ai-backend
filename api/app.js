import express from "express";
import cors from "cors"; // Импортируем прямо из пакета cors
import corsOptions from "./config/cors.js";
import config from "./config/index.js";
import router from "./routes/api.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(config.app.port, () => {
  console.log(`Server running on http://localhost:${config.app.port}`);
});

export default app;
