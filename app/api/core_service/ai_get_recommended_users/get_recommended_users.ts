//app/api/core_service/ai_get_recommended_users/route.ts

import { InputData } from "../../../../types/InputData";
import { Recommendation } from "../../../../types/Recommendation";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

async function processFlavorPreferences(
  jsonData: InputData
): Promise<Recommendation[]> {
  console.log("Processing flavor preferences with JSON data:", jsonData);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `
Process user flavor preferences and tonight's flavors according to these guidelines:

1. Recommend flavors that exactly match or are substrings of whitelist items. Ignore case and special characters (e.g., "cookies & cream" matches "Cookies and Cream").

2. Don't recommend flavors matching or containing blacklist items.

3. Treat custom instructions as additional context for understanding user preferences. Use them to inform recommendations, but they should not override explicit whitelist or blacklist items.

4. Consider flavor components:
   a) If a user whitelists a component of a combination flavor (e.g., "caramel" for "salted caramel"), recommend it unless another component is blacklisted.
   b) Treat flavor names that are substrings of each other as matches (e.g., "caramel" matches "salted caramel").

5. A flavor should be recommended if:
   a) It exactly matches or is a substring of a whitelisted item (ignoring case and special characters)
   OR
   b) It contains a whitelisted item as a component
   AND
   c) It does not match or contain any blacklisted items
   AND
   d) It is available in tonight's flavors

6. If no flavors meet the above criteria, do not recommend (set recommend to false).

7. Be strict in following these rules, but not overly so. If there's a reasonable connection between a user's preferences and an available flavor, lean towards recommending it.

8. IMPORTANT: Only consider flavors listed in "tonightsFlavors" for recommendations. Do not recommend any flavors not in this list, even if they match user preferences.

Input will be a JSON object with this structure:
{
  "tonightsFlavors": ["flavor1", "flavor2", ...],
  "users": [
    {
      "id": "string",
      "whitelist": ["flavor1", "flavor2", ...],
      "blacklist": ["flavor1", "flavor2", ...],
      "customInstructions": "string"
    },
    ...
  ]
}

Processing steps:
1. First, review and memorize the list of tonight's flavors.
2. Normalize all flavor names (lowercase, remove special characters).
3. For each user:
   a) Compare each of tonight's flavors against the user's normalized whitelist items.
   b) Check for partial matches and flavor components.
   c) Ensure no matches or components are in the blacklist.
   d) Consider custom instructions for additional context, but don't use them to override explicit blacklist items.
   e) Set recommend to true if any valid matches from tonight's flavors are found, false otherwise.

Respond with a JSON array containing objects with these properties:
- 'id': The user's ID (string)
- 'recommend': Boolean indicating if any of tonight's flavors should be recommended (true or false)

Your response should be a valid JSON array with no additional text or explanation.

Example:
Input: {
  "tonightsFlavors": ["Vanilla Bean", "Chocolate Chip", "Strawberry", "Mint Chocolate"],
  "users": [
    {
      "id": "1",
      "whitelist": ["vanilla", "chocolate"],
      "blacklist": ["mint"],
      "customInstructions": "I love creamy flavors"
    }
  ]
}
Correct output: [{"id": "1", "recommend": true}]
Explanation (not to be included in output): User 1 gets a recommendation because "Vanilla Bean" matches their "vanilla" preference, and "Chocolate Chip" contains their "chocolate" preference. "Mint Chocolate" is not recommended due to the "mint" blacklist item.Here is the real data array. Write the response to it:

Below is the real array.
${JSON.stringify(jsonData, null, 2)}
`;

  try {
    let result = await model.generateContent(prompt);
    let responseText = result.response.text();
    console.log("Recommendation result:", responseText);

    // Parse the response and validate it
    let recommendations: Recommendation[];
    try {
      recommendations = JSON.parse(responseText);
      if (
        !Array.isArray(recommendations) ||
        !recommendations.every(isValidRecommendation)
      ) {
        throw new Error("Invalid response format");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      throw new Error("Failed to parse AI response");
    }

    return recommendations;
  } catch (error) {
    console.error("Error processing flavor preferences:", error);
    throw new Error("Failed to process flavor preferences");
  }
}

function isValidRecommendation(obj: any): obj is Recommendation {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.recommend === "boolean"
  );
}

export { processFlavorPreferences };
