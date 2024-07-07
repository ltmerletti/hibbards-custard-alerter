import { NextRequest, NextResponse } from "next/server";
import { runCoreService } from "./core_service";

export async function POST(request: NextRequest) {
  let result = await runCoreService();

  if (result.error) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}
