import { NextResponse } from "next/server";
import { runCoreService } from "../core_service/core_service";

export async function GET(request: Request) {
  // Check for the secret to prevent unauthorized access
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const result = await runCoreService();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in cron task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
