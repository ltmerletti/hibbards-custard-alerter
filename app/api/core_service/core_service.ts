import { sendFlavorEmail } from "./email/send_email";
import { getUserEmailAddressById } from "../../db";
import { generateJsonDataStringWithUsersAndFlavors } from "./make_jsonData_string_with_users_and_flavors/generateJsonDataStringWithUsersAndFlavors";
import { processFlavorPreferences } from "./ai_get_recommended_users/get_recommended_users";

import { CoreServiceResult } from "../../../types/CoreServiceResult";
import { InputData } from "../../../types/InputData";
import { Recommendation } from "../../../types/Recommendation";

export async function runCoreService(): Promise<CoreServiceResult> {
  try {
    console.log("Generating combined data...");
    let combinedData: InputData | undefined =
      await generateJsonDataStringWithUsersAndFlavors();

    console.log("Combined data generated:", combinedData);

    if (!combinedData) {
      throw new Error("Failed to generate combined data");
    }

    console.log("Processing flavor preferences...");
    let validUsers: Recommendation[] = await processFlavorPreferences(
      combinedData
    );

    console.log("Valid users:", validUsers);

    // Filter users marked as "true" for sending emails
    console.log("Filtering users for email sending...");
    let usersToSendEmail = validUsers.filter(
      (user) => user.recommend === true
    );

    console.log("Users to send email to:", usersToSendEmail);

    // Pull their email addresses from the database based on their IDs
    console.log("Fetching email addresses from database...");
    let email_addresses = await Promise.all(
      usersToSendEmail.map(async (user) => {
        let userId = parseInt(user.id, 10);
        if (isNaN(userId)) {
          console.error(`Invalid user ID: ${user.id}`);
          return [];
        }
        return await getUserEmailAddressById(userId);
      })
    );

    console.log("Email addresses fetched:", email_addresses);

    // Flatten the array and filter out any null email addresses
    console.log("Flattening and filtering email addresses...");
    let validEmailAddresses = email_addresses
      .flat()
      .filter((item): item is { email: string } => item.email !== null)
      .map((item) => item.email);

    console.log("Valid email addresses:", validEmailAddresses);

    if (validEmailAddresses.length === 0) {
      return { message: "No valid email addresses found" };
    }

    // Send the email to them
    console.log("Sending emails...");
    await sendFlavorEmail(validEmailAddresses);

    console.log("Emails sent successfully");

    return {
      message: "Emails sent successfully",
      emailsSent: validEmailAddresses.length,
    };
  } catch (error) {
    console.error("Error sending emails:", error);
    return {
      message: "An error occurred while sending emails.",
      error: "Email sending failed",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
