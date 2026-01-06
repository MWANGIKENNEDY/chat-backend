import { Request, Response } from "express";
import prisma from "../../prisma/client";



const findOrCreateChat = async (req: Request, res: Response, chatId: string | undefined, memberIds: string[], senderId: string) => {
  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { members: true }
    });
    if (chat) return chat;
  }

  if (!memberIds?.length) {
    res.status(400).json({ message: "Member IDs are required to create a new chat" });
    return null;
  }

  const allMembers = [...new Set([senderId, ...memberIds])];
  return prisma.chat.create({
    data: {
      members: {
        create: allMembers.map(id => ({ userId: id }))
      }
    },
    include: { members: true }
  });
};

/**
 * Create a message in a chat.
 * If chat does not exist, it will create a new one with provided members.
 */
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, memberIds, content, senderId } = req.body;

    if (!senderId) {
      return res.status(400).json({ message: "Sender ID is required" });
    }

    if (!content?.trim()) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const chat = await findOrCreateChat(req, res, chatId, memberIds, senderId);
    if (!chat) return; // Response already sent by findOrCreateChat

    const message = await prisma.message.create({
      data: { chatId: chat.id, senderId, content },
      include: { sender: true }
    });

    res.status(201).json({ chatId: chat.id, message });
  } catch (error) {
    console.error("createMessage error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get messages for a chat
 */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    if (!chatId) return res.status(400).json({ message: "chatId is required" });

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      include: { sender: true }
    });

    res.json(messages);
  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
