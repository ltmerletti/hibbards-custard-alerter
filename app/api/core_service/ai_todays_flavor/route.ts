import { NextRequest, NextResponse } from "next/server";
import { cachedFlavors } from "./extract_flavors";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ cachedFlavors });
  } catch (error) {
    console.error("Error getting flavors:", error);
    return NextResponse.json(
      { error: "Failed to get flavors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ cachedFlavors });
  } catch (error) {
    console.error("Error getting flavors:", error);
    return NextResponse.json(
      { error: "Failed to get flavors" },
      { status: 500 }
    );
  }
}
