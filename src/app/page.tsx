import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-semibold">figTest</h1>
      <p className="text-muted-foreground mt-2">Component playground</p>
      <nav
        className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm"
        aria-label="Main"
      >
        <Link
          href="/signup"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          Sign up (form demo)
        </Link>
        <Link
          href="/sign-in"
          className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Sign in
        </Link>
      </nav>
    </main>
  );
}
