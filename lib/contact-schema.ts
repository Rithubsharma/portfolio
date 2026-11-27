import { z } from "zod";

const singleLine = /^[^\r\n]*$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .regex(singleLine, "Name must be a single line"),
  email: z
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(150, "Subject must be at most 150 characters")
    .regex(singleLine, "Subject must be a single line"),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be at most 5000 characters"),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
