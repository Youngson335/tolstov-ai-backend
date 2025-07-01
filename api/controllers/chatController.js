import chatService from "../services/chatService.js";

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
}

export default new ChatController();
