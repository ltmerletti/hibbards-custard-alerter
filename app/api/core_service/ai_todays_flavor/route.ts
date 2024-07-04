import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Ensure the API key is set
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface FlavorResponse {
  flavors: string[];
}

let cachedFlavors: string[] | null = null;

async function getModel(): Promise<GenerativeModel> {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });
}

function generatePrompt(jsonData: any, currentDate: string): string {
  return `
Today's date is ${currentDate}.
Given the following JSON data, extract the daily flavors mentioned in the most recent post's caption.
Respond only with a JSON object containing a single key "flavors" with an array of flavor strings.
Ensure that if there are no flavors mentioned matching today's date that you return an empty array.
Do not include any Markdown formatting in your response.
Ignore the core four flavors, and instead just display the 3 (give or take) special flavors.

JSON data:
${JSON.stringify(jsonData, null, 2)}
`;
}

export async function extractFlavors(jsonData: any): Promise<string[]> {
  const model = await getModel();
  const currentDate = new Date().toISOString().split("T")[0];
  const prompt = generatePrompt(jsonData, currentDate);

  try {
    const result = await model.generateContent(prompt);
    const flavorsJson = result.response.text();
    const parsedFlavors: FlavorResponse = JSON.parse(flavorsJson);
    return parsedFlavors.flavors || [];
  } catch (error) {
    console.error("Error extracting flavors:", error);
    throw new Error("Failed to extract flavors from AI response");
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const jsonData = await request.json();
    const flavors = await extractFlavors(jsonData);
    cachedFlavors = flavors;
    return NextResponse.json({ flavors });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing the request.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  if (cachedFlavors === null) {
    return NextResponse.json(
      { error: "Flavors have not been extracted yet" },
      { status: 404 }
    );
  }
  return NextResponse.json({ flavors: cachedFlavors });
}

export async function getFlavors(): Promise<string[] | null> {
  return cachedFlavors;
}
