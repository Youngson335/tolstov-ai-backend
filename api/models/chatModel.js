import { db } from "../config/db.js";

const USER_PREFIX = "user:";

class ChatModel {
  async incrementMessageCount(uniqueName) {
    const key = `${USER_PREFIX}${uniqueName}`;
    const user = await db.getUser(key);

    if (!user) return null;

    user.countSentMessages = (user.countSentMessages || 0) + 1;
    user.updatedAt = new Date().toISOString();

    await db.setUser(key, user);

    return user;
  }
  async incrementSession(uniqueName) {
    const key = `${USER_PREFIX}${uniqueName}`;
    const user = await db.getUser(key);

    if (!user) return null;

    user.countVisits = (user.countVisits || 0) + 1;
    user.updatedAt = new Date().toISOString();

    await db.setUser(key, user);

    return user;
  }
}

export default new ChatModel();
