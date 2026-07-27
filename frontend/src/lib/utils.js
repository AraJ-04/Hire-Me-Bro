import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes safely
 * Usage: cn("px-4 py-2", isActive && "bg-blue-600")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}