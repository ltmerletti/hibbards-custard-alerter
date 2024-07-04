"use client";

import { useState, KeyboardEvent } from "react";
import { PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface TagListProps {
  title: string;
  tags: string[];
  email: string;
  updateTags: (email: string, tags: string[]) => Promise<void>;
  className?: string;
}

export default function TagList({
  title,
  tags,
  email,
  updateTags,
  className,
}: TagListProps) {
  const [localTags, setLocalTags] = useState(tags);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTag, setNewTag] = useState("");

  const handleDelete = async (index: number) => {
    const updatedTags = localTags.filter((_, i) => i !== index);
    setLocalTags(updatedTags);
    await updateTags(email, updatedTags);
  };

  const handleEdit = async (index: number, newValue: string) => {
    if (newValue.trim()) {
      const updatedTags = [...localTags];
      updatedTags[index] = newValue.trim();
      setLocalTags(updatedTags);
      setEditingIndex(null);
      await updateTags(email, updatedTags);
    }
  };

  const handleAdd = async () => {
    if (newTag.trim()) {
      const updatedTags = [...localTags, newTag.trim()];
      setLocalTags(updatedTags);
      setNewTag("");
      await updateTags(email, updatedTags);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (e.key === "Enter") {
      if (index !== undefined) {
        handleEdit(index, (e.target as HTMLInputElement).value);
      } else {
        handleAdd();
      }
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {localTags.map((tag, index) => (
          <li key={index} className="flex items-center space-x-2 group">
            {editingIndex === index ? (
              <input
                type="text"
                value={tag}
                onChange={(e) => {
                  const updatedTags = [...localTags];
                  updatedTags[index] = e.target.value;
                  setLocalTags(updatedTags);
                }}
                onBlur={() => handleEdit(index, localTags[index])}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                autoFocus
              />
            ) : (
              <>
                <span className="flex-grow">{tag}</span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new tag"
          className="bg-gray-800 text-white px-2 py-1 rounded flex-grow"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
