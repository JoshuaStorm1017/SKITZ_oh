import { personalities } from '../src/data/personalities';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return personalities without the system prompts for security
  const publicPersonalities = personalities.map(({ systemPrompt, ...rest }) => rest);
  
  res.status(200).json({ personalities: publicPersonalities });
}