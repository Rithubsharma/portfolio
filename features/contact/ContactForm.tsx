"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    // Simulate API call — replace with Resend API later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-success/30 bg-success/5 p-12 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-success/30 bg-success/10">
            <CheckCircle size={28} className="text-success" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-text-primary">Message sent!</p>
            <p className="text-sm text-text-secondary">
              Thanks for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Name"
              placeholder="Rishav Sharma"
              error={errors.name?.message}
              disabled={status === "submitting"}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="rishavsharma3673@gmail.com"
              error={errors.email?.message}
              disabled={status === "submitting"}
              {...register("email")}
            />
          </div>

          <Input
            label="Subject"
            placeholder="Backend engineering opportunity at..."
            error={errors.subject?.message}
            disabled={status === "submitting"}
            {...register("subject")}
          />

          <Textarea
            label="Message"
            placeholder="Hi Rishav, I came across your work on..."
            className="min-h-[140px]"
            error={errors.message?.message}
            disabled={status === "submitting"}
            {...register("message")}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={16} />
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
