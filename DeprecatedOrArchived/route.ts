// Working, but was limited to 20 requests a month (which was inadequate for this project)
// import { NextResponse } from "next/server";

// interface InstagramItem {
//   taken_at: number;
//   caption: {
//     created_at: number;
//     text: string;
//   };
// }

// interface ParsedItem {
//   created_at: number;
//   caption: string;
// }

// interface ParsedData {
//   data: {
//     items: ParsedItem[];
//   };
// }

// function parse_items(data: { data: { items: InstagramItem[] } }): ParsedData {
//   const parsed_items: ParsedItem[] = data.data.items.map((item) => ({
//     created_at: item.caption.created_at,
//     caption: item.caption.text,
//   }));
//   return { data: { items: parsed_items } };
// }

// export async function GET(): Promise<NextResponse> {
//   const url =
//     "https://instagram-api-20231.p.rapidapi.com/api/user_posts_from_username/hibbardscustard?count=5";
//   const options: RequestInit = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": process.env.INSTAGRAM_UNOFFICIAL_API_KEY || "",
//       "x-rapidapi-host": "instagram-api-20231.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const result: { data: { items: InstagramItem[] } } = await response.json();
//     const parsed_data = parse_items(result);
//     return NextResponse.json(parsed_data);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch Instagram data" }, { status: 500 });
//   }
// }
