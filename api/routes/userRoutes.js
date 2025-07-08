import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/", UserController.createNewUser);
router.get("/users_statistics", UserController.getUsersStatistics);
router.get("/:uniqueName", UserController.getByUniqueName);
router.post("/:uniqueName/update_user", UserController.updateUserInfo);

export const userRoutes = router;
