import { Router } from "express";
import { createMessage, getMessages } from "../controllers/messages.controller";

const router = Router();

/**
 * POST /api/messages
 * Body: { chatId?, memberIds?, content }
 * - Creates a message
 * - Auto-creates chat if needed
 */
router.post("/", createMessage);

/**
 * GET /api/messages/:chatId
 * - Get all messages in a chat
 */
router.get("/:chatId", getMessages);

export default router;


