import { nanoid } from "nanoid";
import { db } from "../config/db.js";
import { kv } from "@vercel/kv";

const keys = await kv.keys("user:*");

const USER_PREFIX = "user:";

class UserModel {
  async createNewUser(userData) {
    const key = `${USER_PREFIX}${userData.uniqueName}`;
    const existingUser = await db.getUser(key);

    const user = {
      id: existingUser?.id || nanoid(10),
      ...userData,
      countVisits: existingUser?.countVisits || 0,
      countSentMessages: existingUser?.countSentMessages || 0,
      createdAt: existingUser?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiDrafts: [],
    };

    await db.setUser(key, user);
    return user;
  }

  async findByUniqueName(uniqueName) {
    const key = `${USER_PREFIX}${uniqueName}`;
    const user = await db.getUser(key);

    return user;
  }

  async updateUserInfo(userInfo, uniqueName) {
    const key = `${USER_PREFIX}${uniqueName}`;
    const existingUser = await db.getUser(key);

    const newUserInfo = {
      id: existingUser?.id || nanoid(10),
      userName: userInfo.userName,
      userSurName: userInfo.userSurName,
      userFamilyName: userInfo.userFamilyName,
      uniqueName: uniqueName,
      countVisits: existingUser?.countVisits || 0,
      countSentMessages: existingUser?.countSentMessages || 0,
      createdAt: existingUser?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiDrafts: existingUser.aiDrafts || [],
    };

    await db.setUser(key, newUserInfo);
    return newUserInfo;
  }

  async getUsersStatistics() {
    const all_users = await this.getAllUsers();
    const all_sent_messages = await this.getAllCountSentMessages();

    return {
      all_users: all_users,
      all_sent_messages: all_sent_messages,
    };
  }

  async getAllUsers() {
    const users = await Promise.all(keys.map((key) => kv.get(key)));

    const totalVisits = users.reduce(
      (sum, user) => sum + (user?.countVisits || 0),
      0
    );
    return totalVisits;
  }

  async getAllCountSentMessages() {
    const users = await Promise.all(keys.map((key) => kv.get(key)));

    const totalCountSentMessages = users.reduce(
      (sum, user) => sum + (user?.countSentMessages || 0),
      0
    );
    return totalCountSentMessages;
  }
}

export default new UserModel();
