import { Configuration, OpenAIApi } from "@openai/api";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageUrl } = req.body; // Expecting an image URL in the request

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Construct a detailed prompt for the Vision API
    const prompt = `Analyze the image at the URL: ${imageUrl}. Provide a detailed description focusing on: 1. The types of materials visible, 2. The quality of these materials based on color, texture, and consistency, 3. Any potential contaminants or foreign objects.`;

    try {
      const response = await openai.createCompletion({
        model: "gpt-4-vision-preview", // Assuming this is the correct model identifier
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      res.status(200).json({ analysis: response.data.choices[0].text });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}