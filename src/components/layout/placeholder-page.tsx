// Minimal blank placeholder for nav / footer destinations that aren't built yet.
// Includes top padding so content clears the absolute SiteNav.
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-[var(--space-md)] bg-[var(--color-background-bright)] px-[var(--space-4xl)] pt-[var(--layout-nav-offset-top)] pb-[var(--space-4xl)] text-[var(--color-content)]">
      <h1 className="text-display-lg">{title}</h1>
      <p className="text-body-lg text-[var(--color-content-muted)]">This page is coming soon.</p>
    </main>
  )
}
