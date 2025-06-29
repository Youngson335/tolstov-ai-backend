require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  cors: require("./cors"),
  gigachat: require("./gigachat"),
};
