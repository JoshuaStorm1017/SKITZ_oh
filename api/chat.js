import { GoogleGenerativeAI } from '@google/generative-ai';
import { personalities } from '../src/data/personalities';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, personalityId } = req.body;

    if (!message || !personalityId) {
      return res.status(400).json({ error: 'Missing message or personalityId' });
    }

    const personality = personalities.find(p => p.id === personalityId);
    if (!personality) {
      return res.status(400).json({ error: 'Invalid personalityId' });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: personality.temperature,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `${personality.systemPrompt}\n\nUser: ${message}\n\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ 
      response: text,
      personalityId: personalityId 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}