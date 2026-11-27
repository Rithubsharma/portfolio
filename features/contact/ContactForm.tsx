"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { personal } from "@/lib/data";
import { IS_STATIC_SITE } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "drafted" | "failed";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Your email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    if (IS_STATIC_SITE) {
      // A static host has no server to send mail from, so hand the message to the
      // visitor's own email app as a ready-to-send draft.
      const body = `${values.message}\n\n${values.name}\n${values.email}`;
      window.location.assign(
        `mailto:${personal.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
      );
      setStatus("drafted");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("send failed");
      reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {FIELDS.map((field) => (
        <div key={field.name}>
          <label htmlFor={`contact-${field.name}`} className="block text-sm font-medium text-text-secondary">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            type={field.type}
            autoComplete={field.autoComplete}
            disabled={sending}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
            className="field"
            {...register(field.name)}
          />
          {errors[field.name] && (
            <p id={`contact-${field.name}-error`} className="mt-1.5 text-sm text-error">
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          disabled={sending}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="field resize-y"
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-error">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people, so only bots fill it in. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={sending}
          className="btn"
        >
          {IS_STATIC_SITE ? "Open email draft" : sending ? "Sending message" : "Send message"}
        </button>
        <p role="status" className="text-sm">
          {status === "sent" && <span className="text-success">Message sent. I will reply by email.</span>}
          {status === "drafted" && (
            <span className="text-text-secondary">
              Email draft opened in your mail app. Send it from there.
            </span>
          )}
          {status === "failed" && (
            <span className="text-error">
              The message did not send. Try again, or email {personal.email}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
