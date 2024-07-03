"use client";

import React, { useEffect, useState } from "react";
import { tonightsFlavorsJsonArr } from "../../../proompting/recommend_dummy_data";

interface Recommendation {
  id: string;
  recommend: boolean;
}

const InstagramCoreServiceAiGetRecsPage = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          "/api/core_service/ai_get_recommended_users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tonightsFlavors: tonightsFlavorsJsonArr }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch recommendations. Please try again.");
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Instagram Core Service AI Get Recs Page</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Recommended</h2>
          <ul className="list-disc pl-5">
            {recommendations
              .filter((rec) => rec.recommend)
              .map((rec) => (
                <li key={rec.id}>User ID: {rec.id}</li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Not Recommended</h2>
          <ul className="list-disc pl-5">
            {recommendations
              .filter((rec) => !rec.recommend)
              .map((rec) => (
                <li key={rec.id}>User ID: {rec.id}</li>
              ))}
          </ul>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Raw Data</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(recommendations, null, 2)}
      </pre>
    </div>
  );
};

export default InstagramCoreServiceAiGetRecsPage;