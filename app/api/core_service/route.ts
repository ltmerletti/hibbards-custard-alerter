import { NextRequest, NextResponse } from "next/server";
import { runCoreService } from "./core_service";

export async function POST(request: NextRequest) {
  const result = await runCoreService();

  if (result.error) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}
