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
    <div className={`p-6 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Custom Instructions</h2>
      <div
        className="mt-4 min-h-[8rem] p-3 rounded bg-gray-800 cursor-text"
        onClick={handleClick}
      >
        {isEditing ? (
          <textarea
            value={localInstructions}
            onChange={(e) => setLocalInstructions(e.target.value)}
            onBlur={handleSave}
            className="bg-transparent text-white w-full h-full resize-none focus:outline-none"
            autoFocus
          />
        ) : (
          <p className="text-gray-300">
            {localInstructions || "Click here to add custom instructions."}
          </p>
        )}
      </div>
    </div>
  );
}
