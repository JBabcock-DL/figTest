import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full max-w-lg">
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background-bright)] p-[var(--space-3xl)]">
        <h1
          className="text-[length:var(--headline-lg-font-size)] leading-[var(--headline-lg-line-height)] font-normal"
          style={{ fontFamily: "var(--headline-lg-font-family)" }}
        >
          Sign in (placeholder)
        </h1>
        <p className="text-muted-foreground mt-2">
          This repo doesn’t implement auth yet. This page exists so the signup
          footer link is not a dead end.
        </p>

        <div className="mt-[var(--space-xl)]">
          <Link className="text-primary underline underline-offset-4" href="/signup">
            Back to signup
          </Link>
        </div>
      </div>
    </div>
  );
}

