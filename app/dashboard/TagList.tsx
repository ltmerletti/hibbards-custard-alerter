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
    <div className={`p-6 rounded-lg shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <ul className="space-y-2">
        {localTags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white dark:bg-gray-600 rounded-md p-2 shadow-sm"
          >
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
                className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            ) : (
              <>
                <span className="flex-grow text-gray-800 dark:text-gray-200">
                  {tag}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
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
          className="bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
