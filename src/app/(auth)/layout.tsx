import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[var(--color-background-bright)] px-[var(--space-3xl)] pb-[var(--space-3xl)] pt-[var(--layout-nav-offset-top)]">
      {children}
    </main>
  );
}

