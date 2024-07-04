// File: /app/instagram/ai_todays_flavor/page.tsx

"use client";

import { useState, useEffect } from "react";
import { parsed_captions } from "../../../examples/parsed-captions";

export default function AiTodaysFlavor() {
  const [flavors, setFlavors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlavors() {
      try {
        const response = await fetch("/api/core_service/ai_todays_flavor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parsed_captions
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flavors");
        }

        const data = await response.json();
        setFlavors(data.flavors || []);
      } catch (err) {
        setError("An error occurred while fetching the flavors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFlavors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <p>No flavors found for today.</p>
      )}
    </div>
  );
}
