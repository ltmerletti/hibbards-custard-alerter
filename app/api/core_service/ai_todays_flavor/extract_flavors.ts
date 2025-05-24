import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFlavor, setFlavors } from "@/app/db";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function extractFlavors(jsonData: any): Promise<string[]> {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "",
    generationConfig: { responseMimeType: "application/json" },
  });

  let currentDate = new Date().toISOString().split("T")[0];

  let prompt = `
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
    let result = await model.generateContent(prompt);
    let flavorsJson = result.response.text();
    let parsedFlavors = JSON.parse(flavorsJson);
    await setFlavors(parsedFlavors.flavors || []);
    return parsedFlavors.flavors || [];
  } catch (error) {
    console.error("Error extracting flavors:", error);
    throw new Error("Failed to extract flavors from AI response");
  }
}

// Define the function to get the flavors
export async function getFlavorArray(): Promise<string[]> {
  return await getFlavor();
}
