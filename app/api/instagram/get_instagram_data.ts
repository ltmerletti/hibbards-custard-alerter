// File: /app/api/instagram/route.ts

import { formatInTimeZone } from "date-fns-tz";

interface InstagramPost {
  taken_at_timestamp: number;
  edge_media_to_caption: {
    edges: Array<{
      node: {
        text: string;
      };
    }>;
  };
}

interface ParsedPost {
  created_at: string;
  caption: string;
}

export interface ParsedData {
  data: {
    items: ParsedPost[];
  };
}

function parseInstagramPosts(data: any): ParsedData {
  let posts: InstagramPost[] = data.data.edges.map((edge: any) => edge.node);

  let parsedPosts = posts.map((post) => {
    let date = new Date(post.taken_at_timestamp * 1000);
    let formattedDate = formatInTimeZone(
      date,
      "America/New_York",
      "MMMM d, yyyy 'at' h:mm a zzz"
    );
    return {
      created_at: formattedDate,
      caption: post.edge_media_to_caption.edges[0]?.node.text || "",
    };
  });

  return { data: { items: parsedPosts } };
}

export async function fetchInstagramData(): Promise<ParsedData> {
  const url =
    "https://instagram-scraper-20231.p.rapidapi.com/userposts/1385181737/12/%7Bend_cursor%7D";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.INSTAGRAM_UNOFFICIAL_API_KEY ?? "",
      "x-rapidapi-host": "instagram-scraper-20231.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    console.log("Raw API response:", result);

    // Parse the result as JSON
    const jsonResult = JSON.parse(result);

    // Parse the Instagram posts
    return parseInstagramPosts(jsonResult);
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    throw new Error(
      `Failed to fetch Instagram data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
