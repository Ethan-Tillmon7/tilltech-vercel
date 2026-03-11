import { NextResponse } from "next/server";

// Simple in-memory rate limiter (resets on server restart)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(str: string): string {
  return str.trim().slice(0, 5000);
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitize(String(body.name ?? ""));
    const email = sanitize(String(body.email ?? ""));
    const subject = sanitize(String(body.subject ?? ""));
    const message = sanitize(String(body.message ?? ""));

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format server-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Enforce field length limits
    if (name.length > 200 || email.length > 320 || subject.length > 500 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input exceeds maximum length" },
        { status: 400 }
      );
    }

    // EmailJS REST API
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json({ success: true });
    }

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: { name, email, subject, message },
      }),
    });

    if (!res.ok) {
      throw new Error("EmailJS failed");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
