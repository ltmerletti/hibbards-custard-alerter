"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Flavors() {
  const [flavors, setFlavors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/core_service/ai_todays_flavor")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFlavors(data);
        } else if (data && Array.isArray(data.flavors)) {
          setFlavors(data.flavors);
        } else {
          throw new Error("Unexpected data structure");
        }
      })
      .catch((error) => {
        console.error("Error fetching flavors:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black text-white">
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            Hibbard&apos;s Custard
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Today&apos;s Flavors
            </h1>
            {isLoading ? (
              <div className="text-center text-gray-600 dark:text-gray-400">
                Loading flavors...
              </div>
            ) : error ? (
              <div className="text-center text-red-600 dark:text-red-400">
                Error: {error}
              </div>
            ) : flavors.length > 0 ? (
              <ul className="space-y-2">
                {flavors.map((flavor, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-800 dark:text-gray-200"
                  >
                    {flavor}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No flavors available today.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
