import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[var(--color-background-bright)] px-6 pb-12 pt-[160px]">
      {children}
    </main>
  );
}

