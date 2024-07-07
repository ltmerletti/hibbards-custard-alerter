import { ParsedData } from "../../../types/ParsedData";
import { formatInTimeZone } from "date-fns-tz";
import { response } from "../../../examples/api-response-july-6"; // Import the static response data

const USE_STATIC_DATA = false; // Toggle this to switch between API and static data

interface InstagramPost {
  taken_at: number;
  caption: {
    text: string;
  };
}

function parseInstagramPosts(data: any): ParsedData {
  let posts: InstagramPost[] = data.data.items;

  let parsedPosts = posts.map((post) => {
    let date = new Date(post.taken_at * 1000);
    let formattedDate = formatInTimeZone(
      date,
      "America/New_York",
      "MMMM d, yyyy 'at' h:mm a zzz"
    );
    return {
      created_at: formattedDate,
      caption: post.caption.text || "",
    };
  });

  return { data: { items: parsedPosts } };
}

export async function fetchInstagramData(): Promise<ParsedData> {
  if (USE_STATIC_DATA) {
    console.log("Using static data");
    return parseInstagramPosts(response);
  } else {
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
      let response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let result = await response.text();
      console.log("Raw API response:", result);

      // Parse the result as JSON
      let jsonResult = JSON.parse(result);

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
}
