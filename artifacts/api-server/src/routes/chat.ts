import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert college admissions advisor specialising in helping South African students gain admission to world-class universities — Ivy League (Harvard, Yale, Princeton, etc.), Oxford, Cambridge, MIT, Stanford, UCT, Wits, Stellenbosch and more. Your focus areas are:
- Essay writing (personal statement, "why this school", challenge, activities, diversity essays)
- Interview preparation (common questions, STAR method, body language, virtual tips)
- Academic planning (matric marks, SAT/ACT, Grade 10-12 strategy)
- Scholarship advice (NSFAS, bursaries, Gates, Rhodes, Chevening, etc.)
- Extracurricular strategy (leadership, "spike" development, impact quantification)

Tone: warm, direct, encouraging, specific. No fluff. Limit to 3-4 focused paragraphs per response.`;

router.post('/api/chat', async (req, res) => {
  try {
    const { messages, mode } = req.body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      mode?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10), // keep last 10 messages for context
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : '';
    res.json({ reply });
  } catch (err: any) {
    console.error('Chat error:', err?.message);
    res.status(500).json({ error: 'AI unavailable' });
  }
});

export default router;
