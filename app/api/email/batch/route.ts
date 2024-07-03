import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { emails, subject, html } = await req.json();

    if (!Array.isArray(emails) || !subject || !html) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid input. Please provide an email array, subject, and HTML content.",
        },
        { status: 400 }
      );
    }

    const batchEmails = emails.map((email) => ({
      from: "Hibbard's Custard Notifier <hibbards-custard-notifier@resend.dev>",
      to: [email],
      subject: subject,
      html: html,
    }));

    const result = await resend.batch.send(batchEmails);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
