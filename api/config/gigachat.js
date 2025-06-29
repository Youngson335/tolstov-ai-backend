const { randomUUID } = require("crypto");

module.exports = {
  clientId:
    process.env.GIGACHAT_CLIENT_ID || "2087ba9d-220d-497e-91b1-0f0935277d28",
  clientSecret:
    process.env.GIGACHAT_CLIENT_SECRET ||
    "40a35ced-9634-4b9d-974e-5abefc81e391",
  authUrl: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
  apiUrl: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
  scope: "GIGACHAT_API_PERS",
  getAuthKey() {
    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      "base64"
    );
  },
  generateRqUID() {
    return randomUUID();
  },
};
