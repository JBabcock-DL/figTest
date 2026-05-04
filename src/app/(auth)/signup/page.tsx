"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const signupSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(1, "Re-enter your password"),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, "You must accept the terms to continue"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Must match your password",
  });

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [values, setValues] = useState<SignupValues>({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof SignupValues, boolean>>
  >({});

  const errors = useMemo(() => {
    const result = signupSchema.safeParse(values);
    if (result.success) return {};
    const next: Partial<Record<keyof SignupValues, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof SignupValues | undefined;
      if (key && !next[key]) next[key] = issue.message;
    }
    return next;
  }, [values]);

  const visibleErrors = useMemo(() => {
    const next: Partial<Record<keyof SignupValues, string>> = {};
    const shouldShow = (k: keyof SignupValues) => {
      if (touched[k]) return true;
      if (k === "acceptTerms") return false;
      const v = values[k];
      return typeof v === "string" && v.length > 0;
    };
    (Object.keys(errors) as Array<keyof SignupValues>).forEach((k) => {
      if (shouldShow(k) && errors[k]) next[k] = errors[k];
    });
    return next;
  }, [errors, touched, values]);

  const acceptTerms = values.acceptTerms;
  const canSubmit = useMemo(
    () =>
      Object.keys(errors).length === 0 &&
      acceptTerms &&
      values.email.length > 0 &&
      values.password.length > 0 &&
      values.confirmPassword.length > 0,
    [acceptTerms, errors, values.confirmPassword.length, values.email.length, values.password.length]
  );

  return (
    <div className="w-full max-w-lg">
      <div
        className={cn(
          "flex flex-col",
          "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background-bright)]",
          "shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)]",
          "p-[var(--space-3xl)]",
          "gap-[var(--space-xl)]"
        )}
      >
        <h1
          className="text-[27px] leading-[34px] font-bold text-[#1f242e] text-center"
          style={{ fontFamily: "var(--headline-lg-font-family)" }}
        >
          Create account
        </h1>

        <form
          className="flex flex-col gap-[var(--space-xl)]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={values.email}
              aria-invalid={!!visibleErrors.email}
              aria-describedby={visibleErrors.email ? "signup-email-error" : "signup-email-help"}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            <p id="signup-email-help" className="text-sm text-muted-foreground">
              We will never share your email.
            </p>
            {visibleErrors.email && (
              <p
                id="signup-email-error"
                role="alert"
                className="text-sm font-medium text-[var(--color-danger)]"
              >
                {visibleErrors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={values.password}
              aria-invalid={!!visibleErrors.password}
              aria-describedby={
                visibleErrors.password ? "signup-password-error" : "signup-password-help"
              }
              onChange={(e) =>
                setValues((v) => ({ ...v, password: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            />
            <p id="signup-password-help" className="text-sm text-muted-foreground">
              Use at least 8 characters.
            </p>
            {visibleErrors.password && (
              <p
                id="signup-password-error"
                role="alert"
                className="text-sm font-medium text-[var(--color-danger)]"
              >
                {visibleErrors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="signup-confirm">Re-enter Password</Label>
            <Input
              id="signup-confirm"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={values.confirmPassword}
              aria-invalid={!!visibleErrors.confirmPassword}
              aria-describedby={
                visibleErrors.confirmPassword
                  ? "signup-confirm-error"
                  : "signup-confirm-help"
              }
              onChange={(e) =>
                setValues((v) => ({ ...v, confirmPassword: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
            />
            <p id="signup-confirm-help" className="text-sm text-muted-foreground">
              Must match your password.
            </p>
            {visibleErrors.confirmPassword && (
              <p
                id="signup-confirm-error"
                role="alert"
                className="text-sm font-medium text-[var(--color-danger)]"
              >
                {visibleErrors.confirmPassword}
              </p>
            )}
          </div>

          <Label
            className={cn(
              "flex cursor-pointer items-center gap-[var(--space-md,12px)] select-none font-normal"
            )}
          >
            <Checkbox
              id="signup-terms"
              className={cn(
                "h-5 w-5 shrink-0 rounded-[8px]",
                "border-[var(--color-border)]",
                "data-[state=checked]:border-[var(--color-primary)] data-[state=checked]:bg-[var(--color-primary)]"
              )}
              checked={values.acceptTerms}
              onCheckedChange={(v) =>
                setValues((cur) => ({ ...cur, acceptTerms: v === true }))
              }
              onBlur={() => setTouched((t) => ({ ...t, acceptTerms: true }))}
              aria-invalid={!!visibleErrors.acceptTerms}
              aria-describedby={visibleErrors.acceptTerms ? "signup-terms-error" : undefined}
            />
            <span className="text-sm font-medium leading-snug text-foreground">
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </Label>
          {visibleErrors.acceptTerms && (
            <p
              id="signup-terms-error"
              role="alert"
              className="text-sm font-medium text-[var(--color-danger)]"
            >
              {visibleErrors.acceptTerms}
            </p>
          )}

          <Button className="w-full" size="lg" type="submit" disabled={!canSubmit}>
            Create account
          </Button>

          <div
            className={cn(
              "text-center text-[color:var(--color-secondary,#625b71)]",
              "font-[var(--label-lg-font-weight)]",
              "text-[length:var(--label-lg-font-size)]",
              "leading-[var(--label-lg-line-height)]"
            )}
            style={{ fontFamily: "var(--label-lg-font-family)" }}
          >
            Already have an account?{" "}
            <Link className="text-primary underline underline-offset-4" href="/sign-in">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

