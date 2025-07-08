import chatService from "../services/chatService.js";
import ChatModel from "../models/chatModel.js";

class ChatController {
  async processMessage(req, res, next) {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await chatService.sendMessage(message);
      res.json({ response });
    } catch (error) {
      next(error);
    }
  }
  async incrementMessages(req, res) {
    try {
      const { uniqueName } = req.params;
      const user = await ChatModel.incrementMessageCount(uniqueName);

      if (!user) {
        return res.status(404).json({ error: "Юзер не найден" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating message count:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async setNumberSession(req, res) {
    try {
      const { uniqueName } = req.params;
      const user = await ChatModel.incrementSession(uniqueName);

      if (!user) {
        return res.status(404).json({ error: "Юзер не найден" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Ошибка записи ответов:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ChatController();
