"use client";

import { useEffect, useState } from "react";

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

  if (isLoading) {
    return <div>Loading flavors...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Today&apos;s Flavors</h1>
      {flavors.length > 0 ? (
        <ul>
          {flavors.map((flavor, index) => (
            <li key={index}>{flavor}</li>
          ))}
        </ul>
      ) : (
        <p>No flavors available today.</p>
      )}
    </div>
  );
}
