'use client'
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TagsStep = ({ aiTags, selectedTags, toggleTagSelection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>AI-Generated Tags</h2>
        <p style={{ color: "#64748b" }}>Our AI has analyzed your images and suggested these tags</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <AnimatePresence>
          {aiTags.map((tag, index) => (
            <motion.div
              key={tag.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleTagSelection(tag.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: selectedTags.includes(tag.name) ? "#6366f1" : "#e5e7eb",
                color: selectedTags.includes(tag.name) ? "#ffffff" : "#64748b",
              }}
            >
              <span>{tag.name}</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.125rem 0.375rem",
                  borderRadius: "9999px",
                  backgroundColor: selectedTags.includes(tag.name) ? "rgba(255, 255, 255, 0.2)" : "rgba(100, 116, 139, 0.2)",
                  color: selectedTags.includes(tag.name) ? "#ffffff" : "#64748b",
                }}
              >
                {Math.round(tag.confidence * 100)}%
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {aiTags.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem" }}>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
            {selectedTags.length} of {aiTags.length} tags selected
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button variant="outline" size="sm" onClick={() => setSelectedTags([])}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedTags(aiTags.map((tag) => tag.name))}>
              Select All
            </Button>
          </div>
        </div>
      )}

      <div style={{ paddingTop: "1rem", borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "#e5e7eb" }}>
        <label htmlFor="custom-tags" style={{ marginBottom: "0.5rem", display: "block" }}>
          Add Custom Tags
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Input
            id="custom-tags"
            placeholder="Enter a tag and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                toggleTagSelection(e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
          />
          <Button variant="secondary">Add</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TagsStep;
