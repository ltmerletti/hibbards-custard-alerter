import nodemailer from "nodemailer";
import { getFlavors } from "../ai_todays_flavor/extract_flavors";

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
  const flavors = await getFlavors();
  return flavors.map((flavor) => `- ${flavor}`).join("\n");
}

interface EmailOptions {
  to: string[];
  subject: string;
  text: string;
}

async function sendEmail({ to, subject, text }: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to.join(", "),
    subject,
    text,
  });
}

export async function sendFlavorEmail(
  email_addresses: string[]
): Promise<void> {
  const flavorList = await getFlavorsToString();
  const subject = "Hibbard's Has Flavors You Might be Interested in!";
  const text = `Hibbard's has flavors you might be interested in! Today's flavors are:
${flavorList}

And, as always, you can find today's flavors on Hibbard's Instagram page, or on our website.
`;

  await sendEmail({ to: email_addresses, subject, text });
}
