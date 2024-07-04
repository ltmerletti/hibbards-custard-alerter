import {
  getAllUsers,
  getWhitelist,
  getBlacklist,
  getCustomInstructions,
} from "../../../db";

interface InstagramPost {
  created_at: string;
  caption: string;
}

interface InstagramData {
  data: {
    items: InstagramPost[];
  };
}

export async function generateJsonDataStringWithUsersAndFlavors() {
  try {
    // Fetch Instagram data
    let parsed_data: InstagramData;
    const instagramResponse = await fetch(`/api/instagram`);
    if (!instagramResponse.ok) {
      throw new Error(`HTTP error! status: ${instagramResponse.status}`);
    }
    parsed_data = await instagramResponse.json();
    if (!parsed_data.data || !Array.isArray(parsed_data.data.items)) {
      throw new Error("Invalid data structure received from API");
    }

    // Fetch flavors
    const flavorResponse = await fetch(`/api/instagram/ai_todays_flavor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parsed_captions: parsed_data.data.items,
      }),
    });

    if (!flavorResponse.ok) {
      throw new Error("Failed to fetch flavors");
    }

    const flavorData = await flavorResponse.json();
    const tonightsFlavors = flavorData.flavors || [];

    // Fetch all users from the database
    const users = await getAllUsers();

    const jsonData = {
      tonightsFlavors,
      users: await Promise.all(
        users.map(async (user) => ({
          id: user.id.toString(),
          whitelist: await getWhitelist(user.email ?? ""),
          blacklist: await getBlacklist(user.email ?? ""),
          customInstructions: await getCustomInstructions(user.email ?? ""),
        }))
      ),
    };

    console.log("Final JSON data for processing:", jsonData);

    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
}
