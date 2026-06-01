import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind class lists with conflict resolution (shadcn/ui convention).
 *
 * @param inputs - Class names, objects, or arrays accepted by `clsx`
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
