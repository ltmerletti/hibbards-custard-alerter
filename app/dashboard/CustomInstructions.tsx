"use client";
import { useState, useEffect } from "react";

interface CustomInstructionsProps {
  instructions: string;
  email: string;
  updateInstructions: (email: string, instructions: string) => Promise<void>;
  className?: string;
}

export default function CustomInstructions({
  instructions,
  email,
  updateInstructions,
  className,
}: CustomInstructionsProps) {
  const [localInstructions, setLocalInstructions] = useState(instructions);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalInstructions(instructions);
  }, [instructions]);

  const handleSave = async () => {
    await updateInstructions(email, localInstructions);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <div className={`p-6 rounded-md shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Edit Custom Instructions
      </h2>
      <div
        className={`mt-2 min-h-[8rem] p-3 rounded-md bg-gray-100 dark:bg-gray-800 cursor-text transition-colors duration-200 ${
          isEditing ? "bg-gray-200 dark:bg-gray-700" : ""
        }`}
        onClick={handleClick}
      >
        {isEditing ? (
          <textarea
            value={localInstructions}
            onChange={(e) => setLocalInstructions(e.target.value)}
            onBlur={handleSave}
            className="w-full h-full resize-none bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
            autoFocus
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            {localInstructions || "Click here to add custom instructions."}
          </p>
        )}
      </div>
    </div>
  );
}
