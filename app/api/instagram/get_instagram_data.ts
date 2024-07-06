// File: /app/api/instagram/route.ts

import { formatInTimeZone } from "date-fns-tz";

import { ParsedData } from "../../../types/ParsedData";

import { response } from "../../../examples/api-response-july-6";

interface InstagramPost {
  taken_at: number;
  caption: {
    text: string;
  };
}

function parseInstagramPosts(data: any): ParsedData {
  console.log("Parsing Instagram posts...");
  console.log("Data:", data);
  let posts: InstagramPost[] = data.items;
  console.log("Posts:", posts);

  let parsedPosts = posts.map((post) => {
    console.log("Parsing post:", post);
    let date = new Date(post.taken_at * 1000);
    console.log("Date:", date);
    let formattedDate = formatInTimeZone(
      date,
      "America/New_York",
      "MMMM d, yyyy 'at' h:mm a zzz"
    );
    console.log("Formatted date:", formattedDate);
    return {
      created_at: formattedDate,
      caption: post.caption.text || "",
    };
  });
  console.log("Parsed posts:", parsedPosts);

  return { data: { items: parsedPosts } };
}

export async function fetchInstagramData(): Promise<ParsedData> {
  console.log("Fetching Instagram data...");
  // const url =
  //   "https://instagram-scraper-20231.p.rapidapi.com/userposts/1385181737/12/%7Bend_cursor%7D";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": process.env.INSTAGRAM_UNOFFICIAL_API_KEY ?? "",
  //     "x-rapidapi-host": "instagram-scraper-20231.p.rapidapi.com",
  //   },
  // };

  try {
    console.log("Attempting to fetch data...");
    // const response = await fetch(url, options);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const result = await response.text();
    // console.log("Raw API response:", result);

    const result = JSON.stringify(response);
    console.log("Result:", result);

    // Parse the result as JSON
    const jsonResult = JSON.parse(result);
    console.log("JSON result:", jsonResult);

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
