'use client';
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Upload, ImageIcon, Tag, FileText, Moon, Sun, Sparkles, Leaf, Zap, Minimize2 } from "lucide-react";
import Stepper from "./upload/stepper";
import UploadStep from "./upload/upl";
import PreviewStep from "./upload/preview";
import TagsStep from "./upload/tag";
import DetailsStep from "./upload/details";
import ThemeSwitcherComponent from "./upload/themes";
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { CopilotPopup } from "@copilotkit/react-ui";

const themes = {
  dark: {
    name: "Dark Mode",
    icon: Moon,
    className: "theme-dark bg-zinc-900 text-zinc-100",
    accent: "bg-indigo-500",
  },
  light: {
    name: "Light Mode",
    icon: Sun,
    className: "theme-light bg-zinc-50 text-zinc-900",
    accent: "bg-blue-500",
  },
  cyberpunk: {
    name: "Cyberpunk",
    icon: Sparkles,
    className: "theme-cyberpunk bg-purple-950 text-pink-300",
    accent: "bg-pink-500",
  },
  nature: {
    name: "Nature",
    icon: Leaf,
    className: "theme-nature bg-emerald-950 text-emerald-100",
    accent: "bg-emerald-500",
  },
  futuristic: {
    name: "Futuristic",
    icon: Zap,
    className: "theme-futuristic bg-slate-900 text-sky-300",
    accent: "bg-sky-500",
  },
  minimalist: {
    name: "Minimalist",
    icon: Minimize2,
    className: "theme-minimalist bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
    accent: "bg-neutral-500",
  },
};

const mockAITags = [
  { name: "Electronics", confidence: 0.98 },
  { name: "Smartphone", confidence: 0.95 },
  { name: "Mobile", confidence: 0.92 },
  { name: "Technology", confidence: 0.89 },
  { name: "Gadget", confidence: 0.85 },
  { name: "Touchscreen", confidence: 0.82 },
  { name: "Wireless", confidence: 0.78 },
  { name: "Digital", confidence: 0.75 },
  { name: "Portable", confidence: 0.72 },
  { name: "Modern", confidence: 0.68 },
];

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Books & Media",
  "Automotive",
  "Health & Wellness",
  "Food & Beverages",
];

export default function ProductUploader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [aiTags, setAiTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [theme, setTheme] = useState("light");
  const [isUploading, setIsUploading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    document.body.className = themes[theme].className;
  }, [theme]);

  useEffect(() => {
    if (currentStep === 2) {
      setAiTags([]);
      const tagInterval = setInterval(() => {
        setAiTags((prev) => {
          if (prev.length >= mockAITags.length) {
            clearInterval(tagInterval);
            return prev;
          }
          return [...prev, mockAITags[prev.length]];
        });
      }, 300);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleImageSelection = (index) => {
    setSelectedImages((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const toggleTagSelection = (tagName) => {
    setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setProductDetails((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const steps = [
    { title: "Upload", icon: Upload },
    { title: "Preview", icon: ImageIcon },
    { title: "Tags", icon: Tag },
    { title: "Details", icon: FileText },
  ];

  const stepContents = [
    <UploadStep
      key="upload"
      files={files}
      setFiles={setFiles}
      uploadProgress={uploadProgress}
      isUploading={isUploading}
      setUploadProgress={setUploadProgress}
      setIsUploading={setIsUploading}
      setPredictions={setPredictions}
    />,
    <PreviewStep
      key="preview"
      previewUrls={files.map((file) => URL.createObjectURL(file))}
      selectedImages={selectedImages}
      toggleImageSelection={toggleImageSelection}
      setSelectedImages={setSelectedImages}
    />,
    <TagsStep
      key="tags"
      aiTags={aiTags}
      selectedTags={selectedTags}
      toggleTagSelection={toggleTagSelection}
      setSelectedTags={setSelectedTags} // Pass the function here
    />,
    <DetailsStep
      key="details"
      productDetails={productDetails}
      handleDetailsChange={handleDetailsChange}
      handleCategoryChange={handleCategoryChange}
      selectedTags={selectedTags}
      toggleTagSelection={toggleTagSelection}
      categories={categories}
      predictions={predictions}
    />,
  ];

  useCopilotReadable({
    description: "The current product details.",
    value: productDetails,
  });

  useCopilotAction({
    name: "updateProductDetails",
    description: "Update the product details",
    parameters: [
      {
        name: "details",
        type: "object",
        description: "The new product details.",
        attributes: [
          {
            name: "name",
            type: "string",
            description: "The name of the product.",
          },
          {
            name: "description",
            type: "string",
            description: "The description of the product.",
          },
          {
            name: "price",
            type: "string",
            description: "The price of the product.",
          },
          {
            name: "category",
            type: "string",
            description: "The category of the product.",
          },
        ],
      },
    ],
    handler: ({ details }) => {
      setProductDetails(details);
      handleNext(); // Automatically move to the next step
    },
    render: "Updating product details...",
  });

  useCopilotAction({
    name: "addTags",
    description: "Add tags to the product",
    parameters: [
      {
        name: "tags",
        type: "string[]",
        description: "The tags to add to the product.",
      },
    ],
    handler: ({ tags }) => {
      setSelectedTags((prevTags) => [...prevTags, ...tags]);
      handleNext(); // Automatically move to the next step
    },
    render: "Adding tags...",
  });

  return (
    <div style={{ minHeight: "100vh", transition: "color 0.3s ease-in-out", backgroundColor: "#f4f4f5", color: "#171717" }}>
      <div style={{ maxWidth: "64rem", margin: "auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>Product Uploader</h1>
          <ThemeSwitcherComponent theme={theme} setTheme={setTheme} themes={themes} />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "0.75rem", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", padding: "1.5rem", marginBottom: "1.5rem", flex: "1", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: "1" }}>
            <AnimatePresence mode="wait">{stepContents[currentStep]}</AnimatePresence>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6366f1", borderColor: "#6366f1" }}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 0 && files.length === 0) ||
              (currentStep === 1 && selectedImages.length === 0) ||
              currentStep === 3
            }
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6366f1", borderColor: "#6366f1" }}
          >
            {currentStep < 3 ? (
              <>
                Next
                <ChevronRight size={16} />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        {/* Display predictions in every step */}
        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Predictions:</h3>
          <ul>
            {predictions.map((pred, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <strong>{pred.label}</strong> ({(pred.score * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CopilotPopup */}
      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </div>
  );
}
