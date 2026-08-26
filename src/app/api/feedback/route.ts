import { NextResponse } from "next/server";
import { Resend } from "resend";

const TYPE_LABELS: Record<string, string> = {
  comment: "Comment",
  bug: "Bug report",
  feature: "Feature request",
};

const MAX_MESSAGE_LENGTH = 5000;

type FeedbackPayload = {
  type?: string;
  message?: string;
  email?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: FeedbackPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: this field is hidden from real users via CSS, so anything
  // filling it in is almost certainly a bot. Pretend to succeed either way.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Please include a message." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const type = body.type && body.type in TYPE_LABELS ? body.type : "comment";
  const email = body.email?.trim();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error(
      "Feedback form submitted but RESEND_API_KEY/CONTACT_EMAIL are not configured.",
    );
    return NextResponse.json(
      { error: "Feedback isn't set up yet. Please try again later." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Trekluent <onboarding@resend.dev>",
    to,
    replyTo: email || undefined,
    subject: `Trekluent feedback: ${TYPE_LABELS[type]}`,
    text: `Type: ${TYPE_LABELS[type]}\n${email ? `From: ${email}\n` : ""}\n${message}`,
  });

  if (error) {
    console.error("Failed to send feedback email:", error);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
