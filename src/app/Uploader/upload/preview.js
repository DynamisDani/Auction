'use client'
import { useState } from "react";


import { motion } from "framer-motion";
import { Check, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PreviewStep = ({ previewUrls, selectedImages, toggleImageSelection, setSelectedImages }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Select Product Images</h2>
        <p style={{ color: "#64748b" }}>Choose which images to include in your product listing</p>
      </div>

      {previewUrls.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {previewUrls.map((url, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleImageSelection(index)}
              style={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: "0.375rem",
                overflow: "hidden",
                borderWidth: "2px",
                cursor: "pointer",
                transition: "all 0.2s",
                borderColor: selectedImages.includes(index) ? "#6366f1" : "transparent",
              }}
            >
              <img src={url} alt={`Preview ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {selectedImages.includes(index) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    backgroundColor: "#6366f1",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    padding: "0.25rem",
                  }}
                >
                  <Check size={16} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem", borderWidth: "1px", borderStyle: "dashed", borderRadius: "0.75rem" }}>
          <ImageIcon style={{ width: "3rem", height: "3rem", color: "#64748b", marginBottom: "1rem" }} />
          <p style={{ color: "#64748b" }}>No images uploaded yet</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
          {selectedImages.length} of {previewUrls.length} images selected
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedImages(previewUrls.map((_, i) => i))}
          disabled={previewUrls.length === 0}
        >
          Select All
        </Button>
      </div>
    </motion.div>
  );
};

export default PreviewStep;
