const { GoogleGenAI } = require('@google/genai');
const { personalities } = require('../src/data/personalities');

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = async function handler(req, res) {
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

    const prompt = `${personality.systemPrompt}\n\nUser: ${message}\n\nAssistant:`;
    
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: prompt,
      config: {
        generationConfig: {
          temperature: personality.temperature,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        thinkingConfig: {
          includeThoughts: false, // Set to true if you want to see the model's thinking process
        },
      },
    });
    
    const text = result.text;

    res.status(200).json({ 
      response: text,
      personalityId: personalityId 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}