import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes safely (shadcn/ui pattern).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
