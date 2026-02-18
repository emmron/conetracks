import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { imageData } = req.body;

  if (!imageData) {
    return res.status(400).json({ error: 'imageData is required' });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageData },
            },
            {
              type: "text",
              text: "Analyze this image of a packed cone for a bong. Estimate its weight/size and describe: 1. The types of materials visible, 2. The quality based on color, texture, and consistency, 3. Any notable observations. Be concise.",
            },
          ],
        },
      ],
      max_tokens: 512,
    });

    res.status(200).json({ analysis: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
}
