import { NextRequest, NextResponse } from "next/server";
import { getFlavorArray } from "./extract_flavors";

export async function GET(request: NextRequest) {
  console.log("WORKING!");
  try {
    let flavors = await getFlavorArray();
    console.log("working!");
    console.log(flavors);
    return NextResponse.json({ flavors });
  } catch (error) {
    console.error("Error getting flavors:", error);
    return NextResponse.json(
      { error: "Failed to get flavors" },
      { status: 500 }
    );
  }
}
