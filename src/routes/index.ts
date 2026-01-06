import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import messageRoutes from "./messages.routes";

const router = Router();

router.get("/health", healthCheck);
router.use("/messages", messageRoutes);

export default router;
