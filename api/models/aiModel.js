import { db } from "../config/db.js";
import userModel from "./userModel.js";

const USER_PREFIX = "user:";

class AiModel {
  async saveAiDrafts(uniqueName, aiDraftText) {
    const newUserInfo = await userModel.findByUniqueName(uniqueName);

    const draftId = this.generateIdForAiDraft(newUserInfo.aiDrafts);

    newUserInfo.aiDrafts.push({
      id: draftId,
      text: aiDraftText.text,
      title: aiDraftText.title,
    });

    await db.setUser(`${USER_PREFIX}${uniqueName}`, newUserInfo);
    console.log(newUserInfo);
    return newUserInfo;
  }

  async deleteAiDraft(userDraft, draftId) {
    const newUserInfo = await userModel.findByUniqueName(userDraft.uniqueName);

    const aiDrafts = Array.isArray(newUserInfo.aiDrafts)
      ? newUserInfo.aiDrafts
      : [];

    newUserInfo.aiDrafts = aiDrafts.filter((item) => item.id != draftId);

    await db.setUser(`${USER_PREFIX}${userDraft.uniqueName}`, newUserInfo);
    return newUserInfo;
  }

  generateIdForAiDraft(aiDraft) {
    const maxId = aiDraft.reduce((max, draft) => {
      const draftId = Number(draft.id) || 0;
      return draftId > max ? draftId : max;
    }, 0);

    const newId = maxId + 1;

    return newId;
  }
}

export default new AiModel();
