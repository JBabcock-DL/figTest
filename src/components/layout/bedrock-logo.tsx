import Image from "next/image"
import { cn } from "@/lib/utils"

type BedrockLogoProps = {
  variant?: "full" | "minimal"
  className?: string
  priority?: boolean
}

/** Full wordmark on desktop; icon-only minimal mark on mobile (`56:4132`). */
export function BedrockLogo({ variant = "full", className, priority }: BedrockLogoProps) {
  if (variant === "minimal") {
    return (
      <Image
        src="/bedrock-logo-minimal.svg"
        alt="Bedrock"
        width={47}
        height={40}
        className={cn("h-[var(--layout-logo-height-minimal)] w-auto", className)}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src="/bedrock-logo.svg"
      alt="Bedrock"
      width={171}
      height={60}
      className={cn("h-[var(--layout-logo-height-full)] w-auto", className)}
      priority={priority}
    />
  )
}
