import OpenAI from 'openai';

export async function POST(req) {
  const token = process.env.GITHUB_TOKEN; // Use the GitHub PAT or Azure key
  if (!token) {
    return new Response(JSON.stringify({ error: "API key not found" }), { status: 500 });
  }

  const endpoint = "https://models.inference.ai.azure.com"; // Azure endpoint
  const modelName = "gpt-4o"; // Ensure this model name is correct for Azure

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 1.0,
      max_tokens: 100,
    });

    if (!response || !response.choices || response.choices.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid response from the model" }), { status: 500 });
    }

    return new Response(JSON.stringify({ reply: response.choices[0].message.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    return new Response(JSON.stringify({ error: 'Failed to get response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
