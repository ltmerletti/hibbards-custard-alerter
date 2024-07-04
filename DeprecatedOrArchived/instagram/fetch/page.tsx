"use client";

import React, { useState, useEffect } from "react";

interface InstagramPost {
  created_at: string;
  caption: string;
}

interface InstagramData {
  data: {
    items: InstagramPost[];
  };
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstagramData() {
      try {
        const response = await fetch("/api/instagram");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: InstagramData = await response.json();
        if (!data.data || !Array.isArray(data.data.items)) {
          throw new Error("Invalid data structure received from API");
        }
        setPosts(data.data.items.slice(0, 5)); // Get the last 5 posts
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching Instagram data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Instagram Posts</h1>
      {posts.length === 0 ? (
        <div className="text-center py-10">No posts found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">{post.created_at}</p>
                <p className="text-gray-800">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}