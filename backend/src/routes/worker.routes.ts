import { Router } from "express";
import { worker_signin_controller } from "../controllers/worker/worker-signin.controller";

const router = Router();

router.post("/signin", worker_signin_controller);

export default router;
