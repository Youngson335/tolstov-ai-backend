import axios from "axios";
import gigachat from "../config/gigachat.js";
import authService from "./authService.js";
import httpsAgent from "../config/httpsAgent.js";

class ChatService {
  constructor() {
    this.axiosInstance = axios.create({
      httpsAgent,
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

export default new ChatService();
