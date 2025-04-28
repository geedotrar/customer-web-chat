import fs from 'fs';
import path from 'path';

const responses = JSON.parse(fs.readFileSync(path.resolve('utils/chatbotResponse.json'), 'utf-8'));

const getSimilarityScore = (str1, str2) => {
  str1 = str1.toLowerCase().trim();
  str2 = str2.toLowerCase().trim();

  const words1 = str1.split(' ');
  const words2 = str2.split(' ');

  const matchCount = words1.filter(word => words2.includes(word)).length;
  const maxLength = Math.max(words1.length, words2.length);

  return matchCount / maxLength;
};

export const handleChatRequest = (req, res) => {
  if (!req.body || !req.body.message) {
    return res.status(400).json({ reply: 'Write your question.' });
  }

  const input = req.body.message.toLowerCase();
  let bestMatch = '';
  let highestScore = 0;

  for (const key in responses) {
    const score = getSimilarityScore(input, key);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = key;
    }
  }

  if (highestScore >= 0.6) {
    res.json({ reply: responses[bestMatch] });
  } else {
    res.json({ reply: "Sorry, I don't understand your question." });
  }
};
