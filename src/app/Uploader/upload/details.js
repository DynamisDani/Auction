'use client'
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DetailsStep = ({ productDetails, handleDetailsChange, handleCategoryChange, selectedTags, toggleTagSelection, categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Product Details</h2>
        <p style={{ color: "#64748b" }}>Fill in the information about your product</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="name">Product Name</label>
          <Input
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleDetailsChange}
            placeholder="Enter product name"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            name="description"
            value={productDetails.description}
            onChange={handleDetailsChange}
            placeholder="Enter product description"
            rows={4}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="price">Price</label>
            <Input
              id="price"
              name="price"
              value={productDetails.price}
              onChange={handleDetailsChange}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="category">Category</label>
            <Select value={productDetails.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "1rem" }}>
          <label>Selected Tags</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "0.75rem", borderWidth: "1px", borderStyle: "solid", borderRadius: "0.375rem", minHeight: "2.5rem" }}>
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.5rem", borderRadius: "9999px", backgroundColor: "#e5e7eb" }}>
                  <FileText size={14} />
                  <span>{tag}</span>
                  <button
                    onClick={() => toggleTagSelection(tag)}
                    style={{ marginLeft: "0.25rem", borderRadius: "9999px", padding: "0.125rem", backgroundColor: "rgba(100, 116, 139, 0.2)" }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: "#64748b", fontSize: "0.875rem", width: "100%", textAlign: "center", margin: "auto" }}>No tags selected</p>
            )}
          </div>
        </div>
      </div>

      <div style={{ paddingTop: "1.5rem" }}>
        <Button style={{ width: "100%" }} size="lg">
          Create Product
        </Button>
      </div>
    </motion.div>
  );
};

export default DetailsStep;
