const axios = require("axios");
const { gigachat } = require("../config");
const cache = require("../utils/cache");

class AuthService {
  constructor() {
    this.axiosInstance = axios.create({
      httpsAgent: require("../config/httpsAgent"),
    });
  }

  async getAccessToken() {
    // Проверяем кеш
    if (cache.hasValidToken()) {
      return cache.getToken();
    }

    try {
      const response = await this.axiosInstance.post(
        gigachat.authUrl,
        new URLSearchParams({ scope: gigachat.scope }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            RqUID: gigachat.generateRqUID(),
            Authorization: `Basic ${gigachat.getAuthKey()}`,
          },
        }
      );

      // Обновляем кеш
      cache.setToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("AuthService error:", error);
      throw new Error("Failed to get access token");
    }
  }
}

module.exports = new AuthService();
