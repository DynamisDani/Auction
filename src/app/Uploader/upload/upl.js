"use client"; // Ensure it's a client component

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const UploadStep = ({ files, setFiles, uploadProgress, isUploading, setUploadProgress, setIsUploading, setPredictions }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
      simulateUpload();
      handleImageUpload(acceptedFiles[0]); // Classify the first uploaded image
    },
  });

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleImageUpload = async (file) => {
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
        setPredictions(data); // Update the predictions state
      } catch (error) {
        console.error("Error classifying image:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Upload Product Images</h2>
        <p style={{ color: "#64748b" }}>Drag and drop your product images or click to browse</p>
      </div>

      <div
        {...getRootProps()}
        style={{
          borderWidth: "2px",
          borderStyle: "dashed",
          borderRadius: "0.75rem",
          padding: "3rem",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          textAlign: "center",
          borderColor: isDragActive ? "#6366f1" : isDragReject ? "#f87171" : "#e5e7eb",
          backgroundColor: isDragActive ? "#e9d5ff" : isDragReject ? "#fee2e2" : "transparent",
        }}
      >
        <input {...getInputProps()} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <motion.div
            animate={{
              scale: isDragActive ? 1.1 : 1,
              y: isDragActive ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Upload style={{ color: "#64748b", width: "3rem", height: "3rem" }} />
          </motion.div>
          <div>
            <p style={{ fontWeight: "500" }}>
              {isDragActive ? "Drop the files here..." : "Drag 'n' drop some files here, or click to select files"}
            </p>
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>Supports JPG, PNG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: "500" }}>Uploaded Files ({files.length})</h3>
            <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
              Clear All
            </Button>
          </div>

          {isUploading && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} style={{ height: "0.5rem" }} />
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{ position: "relative", aspectRatio: "1", borderRadius: "0.375rem", overflow: "hidden", borderWidth: "1px" }}
              >
                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {loading && <p style={{ color: "#6366f1" }}>Processing image...</p>}
      {error && <p style={{ color: "#f87171" }}>{error}</p>}
    </motion.div>
  );
};

export default UploadStep;
