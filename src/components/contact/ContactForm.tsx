"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import socialData from "@/data/social.json";
import type { ContactFormData } from "@/types";

const MESSAGE_MAX = 5000;
const COUNTER_FROM = MESSAGE_MAX - 500;

// The fallback route when the form itself can't deliver.
const linkedIn = socialData.find((s) => s.platform === "LinkedIn")?.url;

type Status =
  | { state: "idle" | "sending" | "sent" }
  | { state: "error"; message: string; offerFallback: boolean };

const notBlank = (label: string) => (value: string) =>
  value.trim().length > 0 || `${label} is required`;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormData & { company: string }>();

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  const onSubmit = async (data: ContactFormData & { company: string }) => {
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({ state: "sent" });
        reset();
        return;
      }
      const body = await res.json().catch(() => null);
      const serverMessage = typeof body?.error === "string" ? body.error : null;
      setStatus({
        state: "error",
        message: serverMessage ?? "The message couldn't be sent.",
        // A 400 is something the visitor can fix in the form; anything else needs another route.
        offerFallback: res.status !== 400,
      });
    } catch {
      setStatus({
        state: "error",
        message: navigator.onLine
          ? "The message couldn't be sent."
          : "You appear to be offline. Your message is still here; send it once you're back online.",
        offerFallback: navigator.onLine,
      });
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-secondary/30 bg-background/50 px-4 py-3 text-text placeholder-text/30 outline-none transition-colors focus:border-primary aria-[invalid=true]:border-red-400/60";
  const errorClasses = "mt-1 text-xs text-red-400";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative mx-auto max-w-xl space-y-5"
    >
      {/* Honeypot for bots. Hidden from people and assistive tech; the API drops anything that fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <label htmlFor="contact-name" className="sr-only">Your name</label>
        <input
          id="contact-name"
          {...register("name", {
            validate: notBlank("Name"),
            maxLength: { value: 200, message: "Name is too long" },
          })}
          placeholder="Your Name"
          autoComplete="name"
          maxLength={200}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClasses}
        />
        {errors.name && (
          <p id="contact-name-error" className={errorClasses}>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">Your email</label>
        <input
          id="contact-email"
          {...register("email", {
            validate: notBlank("Email"),
            maxLength: { value: 320, message: "Email is too long" },
            pattern: {
              value: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/,
              message: "Enter an email like name@example.com",
            },
          })}
          type="email"
          inputMode="email"
          placeholder="Your Email"
          autoComplete="email"
          spellCheck={false}
          maxLength={320}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClasses}
        />
        {errors.email && (
          <p id="contact-email-error" className={errorClasses}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className="sr-only">Subject</label>
        <input
          id="contact-subject"
          {...register("subject", {
            validate: notBlank("Subject"),
            maxLength: { value: 500, message: "Subject is too long" },
          })}
          placeholder="Subject"
          maxLength={500}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={inputClasses}
        />
        {errors.subject && (
          <p id="contact-subject-error" className={errorClasses}>{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">Your message</label>
        <textarea
          id="contact-message"
          {...register("message", {
            validate: notBlank("Message"),
            maxLength: { value: MESSAGE_MAX, message: "Message is too long" },
          })}
          placeholder="Your Message"
          maxLength={MESSAGE_MAX}
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            [errors.message && "contact-message-error", messageLength >= COUNTER_FROM && "contact-message-count"]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`${inputClasses} resize-y`}
        />
        <div className="flex justify-between gap-4">
          {errors.message ? (
            <p id="contact-message-error" className={errorClasses}>{errors.message.message}</p>
          ) : (
            <span />
          )}
          {/* Only surfaces near the cap, so a long paste isn't silently cut off. */}
          {messageLength >= COUNTER_FROM && (
            <p
              id="contact-message-count"
              className={`mt-1 text-xs tabular-nums ${messageLength >= MESSAGE_MAX ? "text-red-400" : "text-text/60"}`}
            >
              {messageLength.toLocaleString()} / {MESSAGE_MAX.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={status.state === "sending"}
        className="w-full"
      >
        {status.state === "sending" ? "Sending..." : "Send Message"}
      </Button>

      <div role="status" aria-live="polite" className="text-center text-sm">
        {status.state === "sent" && (
          <p className="text-primary">Message sent! I&apos;ll get back to you soon.</p>
        )}
        {status.state === "error" && (
          <p className="text-red-400">
            {status.message}
            {status.offerFallback && linkedIn && (
              <>
                {" "}You can also{" "}
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text underline underline-offset-4 transition-colors hover:text-primary"
                >
                  message me on LinkedIn
                </a>
                .
              </>
            )}
          </p>
        )}
      </div>
    </motion.form>
  );
}
