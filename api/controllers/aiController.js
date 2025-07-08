import aiModel from "../models/aiModel.js";
import userModel from "../models/userModel.js";

class AiController {
  async setNewAiDrafts(req, res) {
    try {
      const { uniqueName } = req.params;
      const { aiDraftText } = req.body;
      const user = await aiModel.saveAiDrafts(uniqueName, aiDraftText);
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error("Ошибка", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteAiDraft(req, res) {
    try {
      const { uniqueName } = req.params;
      const { draftId } = req.body;
      const userInfo = await userModel.findByUniqueName(uniqueName);
      const newUserInfo = await aiModel.deleteAiDraft(userInfo, draftId);

      if (newUserInfo) {
        res.status(200).json(newUserInfo);
      }
    } catch (error) {
      console.error("Ошибка", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AiController();
