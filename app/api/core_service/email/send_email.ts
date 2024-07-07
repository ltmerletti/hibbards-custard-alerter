import nodemailer from "nodemailer";
import { getFlavor } from "../../../db";
import { EmailOptions } from "types/EmailOptions";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function getFlavorsToString(): Promise<string> {
  const flavors = await getFlavor();
  return flavors.map((flavor) => ` ${flavor}`).join("\n");
}

async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    bcc: to.join(", "),
    subject,
    html,
  });
}

export async function sendFlavorEmail(
  email_addresses: string[]
): Promise<void> {
  const flavorList = await getFlavorsToString();
  const subject = "Hibbard's Has Flavors You Might be Interested in!";
  let html = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Hibbard's Flavor Alert</title>
</head>

<body
  style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0"
    style="background-color: #4a5568; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <tr>
      <td align="center">
        <h1 style="margin: 0; font-size: 24px;">Hibbard's Flavor Alert</h1>
      </td>
    </tr>
  </table>
  <table width="100%" cellpadding="20" cellspacing="0"
    style="background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <tr>
      <td>
        <p style="font-size: 16px; color: #333;">Great news! Hibbard's has flavors you might be interested in today.
          Check out what's available:</p>
        <p style="font-size: 16px; color: #333;">• ${flavorList
          .split("\n")
          .join("<br>• ")}</p>
        <p style="font-size: 16px; color: #333;">Don't miss out on these delicious options!</p>
        <p style="text-align: center;"><a href="https://hibbards-custard-alerter.vercel.app/"
            style="background-color: #4a5568; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 4px;">Visit
            Our Website</a></p>
      </td>
    </tr>
  </table>
  <table width="100%" cellpadding="20" cellspacing="0">
    <tr>
      <td align="center" style="font-size: 0.9em; color: #666;">
        <p>You can always find today's flavors on <a href="https://www.instagram.com/hibbardscustard/"
            style="color: #4a5568;">Hibbard's Instagram page</a> or on our website.</p>
        <p>© 2024 Hibbard's Frozen Custard. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>

</html> 
`;
  await sendEmail({ to: email_addresses, subject, html });
}
