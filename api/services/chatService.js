const axios = require("axios");
const { gigachat } = require("../config");
const authService = require("./authService");

class ChatService {
  constructor() {
    this.axiosInstance = axios.create({
      httpsAgent: require("../config/httpsAgent"),
    });
  }

  async sendMessage(message) {
    try {
      const accessToken = await authService.getAccessToken();

      const response = await this.axiosInstance.post(
        gigachat.apiUrl,
        {
          model: "GigaChat",
          messages: [{ role: "user", content: message }],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("ChatService error:", error);
      throw error;
    }
  }
}

module.exports = new ChatService();
