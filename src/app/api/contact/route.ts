import { NextResponse } from "next/server";

// Simple in-memory rate limiter (per instance; resets on cold start)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_KEYS = 1000;
const SEND_TIMEOUT = 10_000;

const LIMITS = { name: 200, email: 320, subject: 500, message: 5000 } as const;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Drop expired entries so the map can't grow without bound on a long-lived instance.
  if (rateLimit.size > RATE_LIMIT_MAX_KEYS) {
    for (const [key, entry] of rateLimit) {
      if (now > entry.resetAt) rateLimit.delete(key);
    }
  }

  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

/** Single-line fields: collapse newlines and runs of whitespace so they can't break an email header. */
function singleLine(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function multiLine(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  // Rate limiting by IP
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return error("Too many messages from this connection. Try again in an hour.", 429);
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return error("The request couldn't be read. Refresh the page and try again.", 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked so bots don't retry.
  if (singleLine(body.company)) {
    return NextResponse.json({ success: true });
  }

  const name = singleLine(body.name);
  const email = singleLine(body.email);
  const subject = singleLine(body.subject);
  const message = multiLine(body.message);

  if (!name || !email || !subject || !message) {
    return error("Fill in every field before sending.", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return error("That email address doesn't look right.", 400);
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return error("One of the fields is longer than allowed.", 400);
  }

  // EmailJS REST API
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Never report success for a message that went nowhere.
  if (!serviceId || !templateId || !publicKey) {
    console.error("Contact form: EmailJS env vars are missing; message not sent.");
    return error("The contact form is offline right now.", 503);
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: { name, email, subject, message },
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT),
    });

    if (!res.ok) {
      console.error(`Contact form: EmailJS responded ${res.status}`);
      return error("The message couldn't be delivered.", 502);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "TimeoutError";
    console.error(`Contact form: EmailJS ${timedOut ? "timed out" : "request failed"}`);
    return error(
      timedOut ? "The mail service took too long to answer." : "The message couldn't be delivered.",
      timedOut ? 504 : 502
    );
  }
}
