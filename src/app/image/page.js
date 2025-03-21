"use client"; // Ensure it's a client component

import { useState } from "react";

export default function ImageClassifier() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPEG, PNG, etc.).");
      return;
    }

    setLoading(true);
    setError(null);

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1]; // Remove Base64 metadata

      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: base64Image, parameters: { top_k: 5 } }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          setError("Failed to classify image. Please try again.");
          return;
        }

        const data = await response.json();
        setPredictions(data);
      } catch (error) {
        console.error("Error classifying image:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload an Image for Classification</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={loading}
        className="mb-4"
      />
      {loading && <p className="text-blue-500">Processing image...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <h3 className="text-xl font-semibold mb-2">Predictions:</h3>
        <ul>
          {predictions.map((pred, index) => (
            <li key={index} className="mb-2">
              <strong>{pred.label}</strong> ({(pred.score * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
