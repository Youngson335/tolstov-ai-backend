module.exports = {
  allowedOrigins: ["http://localhost:5173", "https://tolstov-ai.vercel.app"],
  options: {
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
};
