// File: /app/api/instagram/route.ts

import { NextResponse } from "next/server";
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

interface ParsedData {
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

export async function GET(): Promise<NextResponse> {
  const url =
    "https://instagram-scraper-20231.p.rapidapi.com/userposts/1385181737/12/%7Bend_cursor%7D";
  let options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.INSTAGRAM_UNOFFICIAL_API_KEY || "",
      "x-rapidapi-host": "instagram-scraper-20231.p.rapidapi.com",
    },
  };

  try {
    let response = await fetch(url, options);
    let result = await response.text();
    console.log("Raw API response:", result);

    // Parse the result as JSON
    let jsonResult = JSON.parse(result);

    // Parse the Instagram posts
    let parsed_data = parseInstagramPosts(jsonResult);

    return NextResponse.json(parsed_data);
  } catch (error) {
    console.error("Error in Instagram API route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch Instagram data",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
