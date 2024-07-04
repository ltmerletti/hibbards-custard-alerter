import { NextRequest, NextResponse } from "next/server";
import { sendFlavorEmail } from "../core_service/email/route";
import { getUserEmailAddressById } from "../../db";
import { generateJsonDataStringWithUsersAndFlavors } from "./make_jsonData_string_with_users_and_flavors/route";
import {
  processFlavorPreferences,
  Recommendation,
  InputData,
} from "./ai_get_recommended_users/route";

export async function POST(request: NextRequest) {
  try {
    const combinedData: InputData | undefined =
      await generateJsonDataStringWithUsersAndFlavors();

    if (!combinedData) {
      throw new Error("Failed to generate combined data");
    }

    const validUsers: Recommendation[] = await processFlavorPreferences(
      combinedData
    );

    // Filter users marked as "true" for sending emails
    const usersToSendEmail = validUsers.filter(
      (user) => user.recommend === true
    );

    // Pull their email addresses from the database based on their IDs
    const email_addresses = await Promise.all(
      usersToSendEmail.map(async (user) => {
        const userId = parseInt(user.id, 10);
        if (isNaN(userId)) {
          console.error(`Invalid user ID: ${user.id}`);
          return [];
        }
        return await getUserEmailAddressById(userId);
      })
    );

    // Flatten the array and filter out any null email addresses
    const validEmailAddresses = email_addresses
      .flat()
      .filter((item): item is { email: string } => item.email !== null)
      .map((item) => item.email);

    if (validEmailAddresses.length === 0) {
      return NextResponse.json(
        { message: "No valid email addresses found" },
        { status: 200 }
      );
    }

    // Send the email to them
    await sendFlavorEmail(validEmailAddresses);

    return NextResponse.json({
      message: "Emails sent successfully",
      emailsSent: validEmailAddresses.length,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      {
        error: "An error occurred while sending emails.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
