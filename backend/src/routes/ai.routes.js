import express from 'express';
import { chatWithAI } from '../utils/ai.utils.js';

const router = express.Router();

// 🤖 Chat with AI Assistant
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const response = await chatWithAI(message);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
