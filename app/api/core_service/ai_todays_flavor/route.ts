// File: /app/api/instagram/ai_todays_flavor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

async function extractFlavors(jsonData: any): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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

  let result = await model.generateContent(prompt);

  return result.response.text();
}

let parsedFlavors: string[] | null;

export async function POST(request: NextRequest) {
  try {
    let jsonData = await request.json();
    let flavorsJson = await extractFlavors(jsonData);

    // Parse the JSON string and stringify it again to ensure valid JSON
    parsedFlavors = JSON.parse(flavorsJson);
    return NextResponse.json(parsedFlavors);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing the request.",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  return NextResponse.json(parsedFlavors);
}

export async function getFlavors() {
  return parsedFlavors;
}
