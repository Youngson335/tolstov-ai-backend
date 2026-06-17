const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tolstov-ai.vercel.app",
    "https://tolstov-ai-dev.vercel.app",
    "https://habit-tracker-frontend-dev.vercel.app",
    "https://habit-tracker-frontend-prod.vercel.app",
  ],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
