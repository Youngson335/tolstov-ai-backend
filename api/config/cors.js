const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://tolstov-ai.vercel.app",
    "https://tolstov-ai-dev.vercel.app",
  ],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
