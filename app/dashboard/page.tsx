"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { auth } from "app/auth";
import Link from "next/link";

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [whitelist, setWhitelistState] = useState<string[]>([]);
  const [blacklist, setBlacklistState] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      const authSession = await auth();
      setSession(authSession);
      if (authSession?.user?.email) {
        const whitelistResponse = await fetch(
          `/api/whitelist?email=${authSession.user.email}`
        );
        const blacklistResponse = await fetch(
          `/api/blacklist?email=${authSession.user.email}`
        );
        const whitelistData = await whitelistResponse.json();
        const blacklistData = await blacklistResponse.json();
        setWhitelistState(whitelistData);
        setBlacklistState(blacklistData);
      }
    }
    loadData();
  }, []);

  const updateWhitelist = async (newList: string[]) => {
    if (session?.user?.email) {
      await fetch("/api/whitelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email, list: newList }),
      });
      setWhitelistState(newList);
    }
  };

  const updateBlacklist = async (newList: string[]) => {
    if (session?.user?.email) {
      await fetch("/api/blacklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email, list: newList }),
      });
      setBlacklistState(newList);
    }
  };

  if (!session) {
    return (
      <div className="flex h-screen bg-black">
        <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
          You are not logged in. Please{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            log in
          </Link>{" "}
          to access the dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mb-4">Welcome, {session.user?.email}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ListManager
            title="Whitelist"
            items={whitelist}
            onUpdate={updateWhitelist}
          />
          <ListManager
            title="Blacklist"
            items={blacklist}
            onUpdate={updateBlacklist}
          />
        </div>
      </div>
    </div>
  );
}

function ListManager({
  title,
  items,
  onUpdate,
}: {
  title: string;
  items: string[];
  onUpdate: (items: string[]) => void;
}) {
  const [newItem, setNewItem] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const addItem = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    const updatedList = items.filter((_, i) => i !== index);
    onUpdate(updatedList);
  };

  const startEditing = (index: number, value: string) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  const saveEdit = () => {
    if (editingValue.trim() && editingIndex !== null) {
      const updatedList = [...items];
      updatedList[editingIndex] = editingValue.trim();
      onUpdate(updatedList);
      setEditingIndex(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="mb-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex justify-between items-center mb-2 group"
          >
            {editingIndex === items.indexOf(item) ? (
              <input
                type="text"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                className="flex-grow mr-2 p-2 border rounded"
                autoFocus
              />
            ) : (
              <span>{item}</span>
            )}
            <div className="flex items-center">
              <button
                onClick={() => startEditing(items.indexOf(item), item)}
                className="text-gray-500 hover:text-gray-700 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => removeItem(items.indexOf(item))}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-grow mr-2 p-2 border rounded"
          placeholder={`Add to ${title.toLowerCase()}`}
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}
