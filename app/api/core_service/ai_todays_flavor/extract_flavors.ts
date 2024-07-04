import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchInstagramData } from "../../instagram/get_instagram_data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export let cachedFlavors: string[] | null = null;

export async function extractFlavors(jsonData: any): Promise<string[]> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const currentDate = new Date().toISOString().split("T")[0];

  const prompt = `
Today's date is ${currentDate}.
Given the following JSON data, extract the daily flavors mentioned in the most recent post's caption.
Respond only with a JSON object containing a single key "flavors" with an array of flavor strings.
Ensure that if there are no flavors mentioned matching today's date that you return an empty array.
Do not include any Markdown formatting in your response.
Ignore the core four flavors, and instead just display the 3 (give or take) special flavors.

JSON data:
${JSON.stringify(jsonData, null, 2)}
`;

  try {
    const result = await model.generateContent(prompt);
    const flavorsJson = result.response.text();
    const parsedFlavors = JSON.parse(flavorsJson);
    return parsedFlavors.flavors || [];
  } catch (error) {
    console.error("Error extracting flavors:", error);
    throw new Error("Failed to extract flavors from AI response");
  }
}

export async function getFlavors(): Promise<string[]> {
  if (cachedFlavors) {
    return cachedFlavors;
  }

  try {
    const instagramData = await fetchInstagramData();
    const flavors = await extractFlavors(instagramData);
    cachedFlavors = flavors;
    return flavors;
  } catch (error) {
    console.error("Error getting flavors:", error);
    throw new Error("Failed to get flavors");
  }
}
