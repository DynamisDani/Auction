'use client';
import { useState } from 'react';

const ChatWithAI = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        setResponse("Error: " + res.statusText);
        setLoading(false);
        return;
      }

      const text = await res.text(); // Read response as text first
      if (!text) {
        setResponse("Error: Empty response from server");
        setLoading(false);
        return;
      }

      const data = JSON.parse(text); // Convert text to JSON
      setResponse(data.reply || "No response received");
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error communicating with AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Chat with AI</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default ChatWithAI;
