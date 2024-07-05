"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

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
        if (data && Array.isArray(data.flavors)) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <NavBar />

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Today&apos;s Flavors
            </h1>
            {isLoading ? (
              <div className="text-center text-gray-600 dark:text-gray-400 animate-pulse">
                Loading flavors...
              </div>
            ) : error ? (
              <div className="text-center text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-3 rounded-md">
                Error: {error}
              </div>
            ) : flavors.length > 0 ? (
              <ul className="space-y-2">
                {flavors.map((flavor, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-800 dark:text-gray-200 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600"
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