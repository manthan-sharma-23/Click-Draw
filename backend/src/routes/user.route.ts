import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.user.middleware";
import { create_task_controller } from "../controllers/user/create-task.controller";
import { get_task_responses_controller } from "../controllers/user/get-task-responses.controller";
import { user_signin_controller } from "../controllers/user/user-signin.controller";
import { pre_signed_url_controller } from "../controllers/user/presignedUrl.controller";

const router = Router();

router.post("/signin", user_signin_controller);
router.post("/presignedUrl", authMiddleware, pre_signed_url_controller);
router.post("/create-task", authMiddleware, create_task_controller);
router.get("/task", authMiddleware, get_task_responses_controller);

export default router;
