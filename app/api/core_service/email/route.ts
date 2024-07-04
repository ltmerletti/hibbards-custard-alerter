import { NextRequest, NextResponse } from "next/server";
import { sendFlavorEmail } from "./send_email";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email_addresses } = await req.json();

    if (!Array.isArray(email_addresses) || email_addresses.length === 0) {
      return NextResponse.json(
        { error: "Invalid or missing email addresses" },
        { status: 400 }
      );
    }

    await sendFlavorEmail(email_addresses);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: (error as Error).message },
      { status: 500 }
    );
  }
}
