"use client";

import { useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function WaitlistForm({ id, className }: { id?: string; className?: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const emailId = useId();
  const honeypotId = useId();

  const joined = status === "success" || status === "duplicate";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const data = (await response.json()) as { status: Status; message?: string };

      if (data.status === "success") {
        setStatus("success");
      } else if (data.status === "duplicate") {
        setStatus("duplicate");
        setMessage(data.message ?? "You're already on the list.");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Enter a valid email address.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (joined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        id={id}
        role="status"
        className={cn(
          "flex items-center gap-3 rounded-xl border border-emerald/25 bg-emerald-muted px-5 py-4",
          className
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald text-emerald-foreground">
          <Check className="size-4" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-foreground">
          {status === "duplicate" ? message : "You're on the list — we'll email you when SubSentry is ready."}
        </p>
      </motion.div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? `${emailId}-error` : undefined}
            className={cn(
              "h-14 w-full rounded-xl border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground",
              "outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              status === "error" ? "border-destructive" : "border-border"
            )}
          />
          {/* Honeypot — visually hidden and out of tab order, not display:none
              (some bots skip display:none fields but still fill this one). */}
          <div className="h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor={honeypotId}>Company</label>
            <input
              id={honeypotId}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground",
            "transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-70"
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Joining
            </>
          ) : (
            <>
              Join the waitlist
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </div>
      <p
        id={status === "error" ? `${emailId}-error` : undefined}
        role="alert"
        className={cn("mt-2 min-h-5 text-sm text-destructive", status === "error" ? "opacity-100" : "opacity-0")}
      >
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
