'use client'
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {steps.map((step, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          <motion.div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
              transition: "transform 0.5s",
              backgroundColor: currentStep === index ? "#6366f1" : currentStep > index ? "#10b981" : "#e5e7eb",
            }}
            animate={{
              scale: currentStep === index ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: currentStep === index ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
          >
            {currentStep > index ? (
              <Check style={{ color: "white" }} size={18} />
            ) : (
              <step.icon style={{ color: currentStep === index ? "white" : "" }} size={18} />
            )}
          </motion.div>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: currentStep === index ? "500" : "400",
              color: currentStep === index ? "#6366f1" : "#64748b",
            }}
          >
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div style={{ position: "absolute", top: "1.25rem", left: "calc(100% - 0.5rem)", width: "calc(100% - 1rem)", height: "2px", backgroundColor: "#e5e7eb" }}>
              <motion.div
                style={{ backgroundColor: "#6366f1", height: "100%" }}
                initial={{ width: "0%" }}
                animate={{ width: currentStep > index ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
