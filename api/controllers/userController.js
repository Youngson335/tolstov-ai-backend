import UserModel from "../models/userModel.js";

class UserController {
  async createNewUser(req, res) {
    try {
      const { userName, userSurName, userFamilyName, uniqueName } = req.body;

      if (!uniqueName) {
        return res.status(400).json({ error: "Отсутствует юзер-нэйм" });
      }

      const hasUser = await UserModel.findByUniqueName(uniqueName);

      if (hasUser) {
        return res.status(409).json({
          error: "Это имя пользователя уже занято",
          suggestion: "Попробуйте добавить цифры или символы",
        });
      }

      const user = await UserModel.createNewUser({
        userName,
        userSurName,
        userFamilyName,
        uniqueName,
      });

      res.status(200).json(user);
    } catch (error) {
      console.error("Юзер с таким никнеймом отсутствует:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUserInfo(req, res) {
    try {
      const { userName, userSurName, userFamilyName } = req.body;
      const { uniqueName } = req.params;
      if (!uniqueName) {
        return res.status(400).json({ error: "Отсутствует юзер-нэйм" });
      }

      const userInfo = { userName, userSurName, userFamilyName };

      const user = await UserModel.updateUserInfo(userInfo, uniqueName);
      res.status(200).json(user);
    } catch (error) {
      console.error("Ошибка", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getByUniqueName(req, res) {
    try {
      const { uniqueName } = req.params;
      const user = await UserModel.findByUniqueName(uniqueName);

      if (!user) {
        return res.status(404).json({ error: "Юзер не найден!" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUsersStatistics(req, res) {
    try {
      const result = await UserModel.getUsersStatistics();

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
